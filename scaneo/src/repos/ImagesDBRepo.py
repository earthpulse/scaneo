from .DBRepo import DBRepo
import rasterio
import json

class ImagesDBRepo(DBRepo):
    def __init__(self):
        super().__init__()
        cursor = self.get_cursor()
        cursor.execute(f"""CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT NOT NULL,
            campaign_id TEXT,
            bbox TEXT,
            FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
        )""")
        self.commit_and_close_db()

    def get_bbox(self, image):
            src = rasterio.open(image)
            bounds = src.bounds
            crs = src.crs
            if crs != "EPSG:4326":
                bounds = rasterio.warp.transform_bounds(crs, "EPSG:4326", *bounds)
            return json.dumps(bounds)
    
    def create_images(self, images, campaign_id):
        cursor = self.get_cursor()
        cursor.executemany("INSERT INTO images (path, campaign_id, bbox) VALUES (?, ?, ?)", [(image, campaign_id, self.get_bbox(image)) for image in images])
        self.commit_and_close_db()

    def retrieve_images(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM images WHERE campaign_id = ?", (campaign_id,))
        return cursor.fetchall()
    
    def delete_images(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute(f"DELETE FROM images WHERE campaign_id = ?", (campaign_id,))
        self.commit_and_close_db()
