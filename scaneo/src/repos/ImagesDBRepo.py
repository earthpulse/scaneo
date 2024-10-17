from .DBRepo import DBRepo

class ImagesDBRepo(DBRepo):
    def __init__(self):
        super().__init__()
        cursor = self.get_cursor()
        cursor.execute(f"""CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT NOT NULL,
            campaign_id TEXT,
            FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
        )""")
        self.commit_and_close_db()

    def create_images(self, images, campaign_id):
        cursor = self.get_cursor()
        cursor.executemany("INSERT INTO images (path, campaign_id) VALUES (?, ?)", [(image, campaign_id) for image in images])
        self.commit_and_close_db()

    def retrieve_images(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM images WHERE campaign_id = ?", (campaign_id,))
        return cursor.fetchall()
    
    def delete_images(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute(f"DELETE FROM images WHERE campaign_id = ?", (campaign_id,))
        self.commit_and_close_db()
