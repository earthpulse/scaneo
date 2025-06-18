from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
import rasterio as rio
import io
from PIL import Image
import onnxruntime
import numpy as np
from pathlib import Path
import skimage
from skimage.transform import resize


MODELS_PATH = str(Path(__file__).parent / 'models')

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

def load_model(model):
	ort_session = onnxruntime.InferenceSession(MODELS_PATH + '/' + model)
	return ort_session

def inference(model, image):
	ort_session = load_model(model)
	input_name = ort_session.get_inputs()[0].name
	ort_inputs = {input_name: image}
	ort_outs = ort_session.run(None, ort_inputs)
	return ort_outs[0]

def load_image(image, bands=(4,3,2), norm_values=4000):
	ds = rio.open(io.BytesIO(image.file.read())) 
	image = ds.read(bands)
	return ds, np.expand_dims((image / norm_values).clip(0, 1).astype(np.float32), axis=0)

@app.post("/s2-roads")
async def segmentation(
	request: Request,  
	image: UploadFile = File(...), 
):
	ds, image = load_image(image)
	outputs = inference('s2-roads.onnx', image)
	mask = (outputs[0] > 0.5).astype(np.uint8)
	print(mask.shape, mask.dtype, mask.min(), mask.max())
	meta = ds.meta
	print(mask.shape, mask.dtype, mask.min(), mask.max())
	meta.update(count=1, dtype=np.uint8)
	buf = io.BytesIO()
	with rio.open(buf, 'w', **meta) as dst:
		dst.write(mask)
	buf.seek(0)
	return StreamingResponse(buf, media_type="image/tiff")

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

@app.post("/hr-roads")
async def segmentation(
	request: Request,  
	image: UploadFile = File(...), 
):
	image = skimage.io.imread(io.BytesIO(image.file.read()))
	image = (image / 255).astype(np.float32).transpose(2, 0, 1)
	image = np.expand_dims(image, axis=0)
	original_size = image.shape[2:]
	print(original_size)
	if original_size[0] % 32 != 0 or original_size[1] % 32 != 0:
		# resize to nearest multiple of 32
		new_size = (
			32 * (original_size[0] // 32),
			32 * (original_size[1] // 32),
		)
		image = resize(image, (1, 3, *new_size), preserve_range=True)
		print(f"Resized image from {original_size} to {new_size}")
	print(image.shape, image.dtype, image.min(), image.max())
	outputs = inference('hr-roads.onnx', image)
	mask = sigmoid(outputs[0])
	print(mask.shape, mask.dtype, mask.min(), mask.max())
	binary_mask = mask[0] > 0.5
	binary_mask = resize(binary_mask, original_size, preserve_range=True)
	binary_mask = binary_mask.astype(np.uint8)
	img = Image.fromarray(binary_mask, mode="L")
	buf = io.BytesIO()
	img.save(buf, "tiff")
	buf.seek(0)
	return StreamingResponse(buf, media_type="image/tiff")
