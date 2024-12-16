from .DBRepo import DBRepo

class LabelsDBRepo(DBRepo):
	def __init__(self):
		super().__init__()
		cursor = self.get_cursor()
		cursor.execute(f"""CREATE TABLE IF NOT EXISTS labels (
            id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			color TEXT NOT NULL,
			campaign_id TEXT,
			createdAt TEXT,
			updatedAt TEXT,
			FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
			UNIQUE(name, campaign_id)
		)""")
		self.commit_and_close_db()
		
	def retrieve_labels(self, campaign_id):
		cursor = self.get_cursor()
		cursor.execute(f"SELECT * FROM labels WHERE campaign_id = ? ORDER BY createdAt DESC", (campaign_id,))
		return cursor.fetchall()

	def create_label(self, label):
		try:
			cursor = self.get_cursor()
			cursor.execute("INSERT INTO labels (id, name, campaign_id, color, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", 
						  (label.id, label.name, label.campaign_id, label.color, label.createdAt, label.updatedAt))
			self.commit_and_close_db()
		except self.sqlite3.IntegrityError as e:
			if "UNIQUE constraint failed" in str(e):
				raise ValueError(f"A label with name '{label.name}' already exists in this campaign")
			raise e

	def delete_label(self, id):
		cursor = self.get_cursor()
		cursor.execute(f"DELETE FROM labels WHERE id = ?", (id,))
		self.commit_and_close_db()

	def get_label_by_name(self, name, campaign_id):
		cursor = self.get_cursor()
		cursor.execute(f"SELECT * FROM labels WHERE name = ? AND campaign_id = ?", (name, campaign_id))
		return cursor.fetchone()
	
	def delete_labels(self, campaign_id):
		cursor = self.get_cursor()
		cursor.execute(f"DELETE FROM labels WHERE campaign_id = ?", (campaign_id,))
		self.commit_and_close_db()

	def retrieve_label(self, id):
		cursor = self.get_cursor()
		cursor.execute(f"SELECT * FROM labels WHERE id = ?", (id,))
		return cursor.fetchone()
