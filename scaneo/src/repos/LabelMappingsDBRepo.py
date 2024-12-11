from .DBRepo import DBRepo

class LabelMappingsDBRepo(DBRepo):
    def __init__(self):
        super().__init__()
        cursor = self.get_cursor()
        cursor.execute(f"""CREATE TABLE IF NOT EXISTS label_mappings (
            id TEXT PRIMARY KEY,
            campaignId TEXT NOT NULL,
            modelId TEXT NOT NULL,
            labelId TEXT NOT NULL,
            output_index INTEGER NOT NULL,
            FOREIGN KEY (campaignId) REFERENCES campaigns(id),
            FOREIGN KEY (modelId) REFERENCES models(id),
            FOREIGN KEY (labelId) REFERENCES labels(id)
        )""")
        self.commit_and_close_db()

    def label_mapping_exists(self, campaign_id, model_id, label_id):
        cursor = self.get_cursor()
        cursor.execute("SELECT * FROM label_mappings WHERE campaignId = ? AND modelId = ? AND labelId = ?", (campaign_id, model_id, label_id))
        return cursor.fetchone() is not None

    def create_label_mapping(self, label_mapping):
        cursor = self.get_cursor()
        cursor.execute("INSERT INTO label_mappings (id, campaignId, modelId, labelId, output_index) VALUES (?, ?, ?, ?, ?)", 
                       (label_mapping.id, label_mapping.campaignId, label_mapping.modelId, label_mapping.labelId, label_mapping.output_index))
        self.commit_and_close_db()

    def retrieve_label_mappings(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute("SELECT * FROM label_mappings WHERE campaignId = ?", (campaign_id,))
        return cursor.fetchall()
    
    def retrieve_label_mapping_model(self, campaign_id, model_id):
        cursor = self.get_cursor()
        cursor.execute("SELECT * FROM label_mappings WHERE campaignId = ? AND modelId = ?", (campaign_id, model_id))
        return cursor.fetchall()
    
    def retrieve_label_mappings_model(self, model_id):
        cursor = self.get_cursor()
        cursor.execute("SELECT * FROM label_mappings WHERE modelId = ?", (model_id,))
        return cursor.fetchall()
    
    def delete_label_mappings(self, campaign_id):
        cursor = self.get_cursor()
        cursor.execute("DELETE FROM label_mappings WHERE campaignId = ?", (campaign_id,))
        self.commit_and_close_db()

    def delete_label_mapping_model(self, model_id):
        cursor = self.get_cursor()
        cursor.execute("DELETE FROM label_mappings WHERE modelId = ?", (model_id,))
        self.commit_and_close_db()
    
    def delete_label_mapping_label(self, campaign_id, model_id, label_id):
        cursor = self.get_cursor()
        cursor.execute("DELETE FROM label_mappings WHERE campaignId = ? AND modelId = ? AND labelId = ?", (campaign_id, model_id, label_id))
        self.commit_and_close_db()

    def update_label_mapping(self, label_mapping):
        cursor = self.get_cursor()
        cursor.execute("UPDATE label_mappings SET output_index = ? WHERE campaignId = ? AND modelId = ? AND labelId = ?", 
                       (label_mapping.output_index, label_mapping.campaignId, label_mapping.modelId, label_mapping.labelId))
        self.commit_and_close_db()

    def delete_label_mapping(self, id):
        cursor = self.get_cursor()
        cursor.execute("DELETE FROM label_mappings WHERE id = ?", (id,))
        self.commit_and_close_db()