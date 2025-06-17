from .DBRepo import DBRepo
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
    
    def create_images(self, images, campaign_id, bbs):
        cursor = self.get_cursor()
        cursor.executemany("INSERT INTO images (path, campaign_id, bbox) VALUES (?, ?, ?)", [(image, campaign_id, json.dumps(bb)) for image, bb in zip(images, bbs)])
        self.commit_and_close_db()

    def retrieve_images(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM images WHERE campaign_id = ?", (campaign_id,))
        return cursor.fetchall()
    
    def delete_images(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute(f"DELETE FROM images WHERE campaign_id = ?", (campaign_id,))
        self.commit_and_close_db()

    def retrieve_image(self, image_id):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM images WHERE id = ?", (image_id,))
        return cursor.fetchone()
    
    def retrieve_image_by_path(self, path, campaign_id):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM images WHERE path = ? AND campaign_id = ?", (path, campaign_id))
        return cursor.fetchone()