from datetime import datetime
import json

from .DBRepo import DBRepo

class AnnotationsDBRepo(DBRepo):
	def __init__(self):
		super().__init__()
		cursor = self.get_cursor()
		cursor.execute(f"""CREATE TABLE IF NOT EXISTS annotations (
            id TEXT PRIMARY KEY,
			type TEXT NOT NULL,
			value TEXT,
			bb TEXT NULL,
			layer_data TEXT NULL,
			points TEXT NULL,
			image_id INTEGER,
			createdAt TEXT,
			updatedAt TEXT,
			FOREIGN KEY (image_id) REFERENCES images(id)
		)""")
		self.commit_and_close_db()
		
	def retrieve_annotations(self, image_id):
		cursor = self.get_cursor()
		cursor.execute(f"SELECT * FROM annotations WHERE image_id = ? ORDER BY createdAt DESC", (image_id,))
		return cursor.fetchall()
	
	def retrieve_one_annotation(self, id):
		cursor = self.get_cursor()
		cursor.execute(f"SELECT * FROM annotations WHERE id = ?", (id,))
		return cursor.fetchone()

	def create_annotation(self, annotation):
		cursor = self.get_cursor()
		cursor.execute("INSERT INTO annotations (id, type, value, bb, layer_data, points, image_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", (annotation.id, annotation.type, annotation.value, json.dumps(annotation.bb), json.dumps(annotation.layer_data), json.dumps(annotation.points), annotation.image_id, annotation.createdAt, annotation.updatedAt))
		self.commit_and_close_db()

	def update_annotation(self, annotation):
		cursor = self.get_cursor()
		annotation.updatedAt = datetime.now()
		cursor.execute("UPDATE annotations SET type = ?, value = ?, updatedAt = ?, bb = ?, points = ? WHERE id = ?", (annotation.type, annotation.value, annotation.updatedAt, json.dumps(annotation.bb), json.dumps(annotation.points), annotation.id,))
		self.commit_and_close_db()
	
	def delete_annotation(self, id):
		cursor = self.get_cursor()
		cursor.execute(f"DELETE FROM annotations WHERE id = ?", (id,))
		self.commit_and_close_db()

	def get_annotation_by_image_id(self, image_id, value, type):
		cursor = self.get_cursor()
		cursor.execute(f"SELECT * FROM annotations WHERE image_id = ? AND value = ? AND type = ?", (image_id, value, type))
		return cursor.fetchone()
