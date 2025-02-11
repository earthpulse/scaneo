from fastapi import FastAPI, File, UploadFile, status, Form
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
import rasterio as rio
import io
import os
from PIL import Image
from skimage.transform import resize

from .src.eotdl_wrapper import ModelWrapper

app = FastAPI(
	title="models-api",
	description="API to perform inference on models hosted on EOTDL.",
)

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


DOWNLOAD_PATH = os.getenv("EOTDL_DOWNLOAD_PATH", "/tmp")

@app.post("/{model}")
async def inference(
	model: str, 
	image: UploadFile = File(...), 
	version: int = Form(None)
):
	# try:
		# download model from ETODL
		model_wrapper = ModelWrapper(model, path=DOWNLOAD_PATH, version=version)
		# load image in memory as numpy array
		with rio.open(io.BytesIO(image.file.read())) as src:
			image = src.read()
		assert image.ndim == 3, "Image must have 3 dimensions (bands, height, width)"
		# pre-process and validate input
		image = model_wrapper.process_inputs(image)
		# normalization
		image = (
			image / 255.0
		)  # this should be defined in the model metadata (this is only for RGB will not work with satellite images)
		# TODO: resize if necessary
		# execute model
		# outputs = model.predict(image)
		outputs = model_wrapper.predict(image)
		# return outputs
		if model_wrapper.props["mlm:output"]["tasks"] == ["classification"]:
			return outputs
		elif model_wrapper.props["mlm:output"]["tasks"] == ["segmentation"]:  # only returns first output as image
			# return mask
			# image = sigmoid(outputs) > 0.5  # this should be defined in the model metadata
			if outputs.ndim > 3:  # get first band
				outputs = outputs[0]
			print("hola", outputs.shape, model_wrapper.original_size)
			outputs = resize(outputs, model_wrapper.original_size, preserve_range=True)
			# outputs = outputs.astype(np.uint8)
			img = Image.fromarray(outputs[0], mode="F")  # only returns binary mask
			buf = io.BytesIO()
			img.save(buf, "tiff")
			buf.seek(0)
			return StreamingResponse(buf, media_type="image/tiff") 
		else:
			raise Exception(
				"Output task not supported", model.props["mlm:output"]["tasks"]
			)
	# except Exception as e:
	# 	print("ERROR", "inference")
	# 	print(e)
	# 	raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))

@app.get("/{model}")
def retrieve_model_metadata(model: str, version: int = None):
	try:
		model = ModelWrapper(model, path=DOWNLOAD_PATH, version=version)
		return model.gdf.to_json()
	except Exception as e:
		print("ERROR", "retrieve_model_metadata")
		print(e)
		raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))

@app.get("/")
async def hello():
	return {
		"message": "Hello from the models API!",
	}

if __name__ == "__main__":
    app()