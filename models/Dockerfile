FROM python:3.8-slim

WORKDIR /app

ADD . /app

# need to install gdal to make rasterio work in macos

# RUN apt-get update -y && apt-get install -y g++ gdal-bin libgdal-dev

# ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
# ENV C_INCLUDE_PATH=/usr/include/gdal

# RUN pip install --global-option=build_ext --global-option="-I/usr/include/gdal" GDAL==`gdal-config --version`

RUN pip install -r requirements.txt
RUN pip install -r requirements.cpu.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
