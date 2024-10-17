from .DBRepo import DBRepo

class CampaignsDBRepo(DBRepo):
    def __init__(self):
        super().__init__()
        cursor = self.get_cursor()
        cursor.execute(f"""CREATE TABLE IF NOT EXISTS campaigns (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            description TEXT NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )""")
        self.commit_and_close_db()

    def retrieve_campaigns(self):
        cursor = self.get_cursor()
        cursor.execute("SELECT id, name, description, createdAt, updatedAt FROM campaigns")
        return cursor.fetchall()
    
    def create_campaign(self, campaign):
        cursor = self.get_cursor()
        cursor.execute(f"INSERT INTO campaigns (id, name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)", (campaign.id, campaign.name, campaign.description, campaign.createdAt, campaign.updatedAt))
        self.commit_and_close_db()

    def retrieve_campaign(self, id):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM campaigns WHERE id = ?", (id,))
        return cursor.fetchone()

    def delete_campaign(self, id):
        cursor = self.get_cursor()
        cursor.execute(f"DELETE FROM campaigns WHERE id = ?", (id,))
        self.commit_and_close_db()

    def retrieve_one_campaign(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute("SELECT id, name, description, createdAt, updatedAt FROM campaigns WHERE id = ?", (campaign_id,))
        return cursor.fetchone()