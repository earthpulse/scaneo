from datetime import datetime
import json

from .DBRepo import DBRepo
from ..models import DetectionAnnotation

class AnnotationsDBRepo(DBRepo):
	def __init__(self):
		super().__init__()
		cursor = self.get_cursor()
		cursor.execute(f"""CREATE TABLE IF NOT EXISTS annotations (
            id TEXT PRIMARY KEY,
			type TEXT NOT NULL,
			value TEXT,
			image_id INTEGER,
			createdAt TEXT,
			updatedAt TEXT,
			bb TEXT NULL,
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
		if isinstance(annotation, DetectionAnnotation):
			cursor.execute("INSERT INTO annotations (id, type, value, image_id, createdAt, updatedAt, bb) VALUES (?, ?, ?, ?, ?, ?, ?)", (annotation.id, annotation.type, annotation.value, annotation.image_id, annotation.createdAt, annotation.updatedAt, json.dumps(annotation.bb)))
		else:
			cursor.execute("INSERT INTO annotations (id, type, value, image_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", (annotation.id, annotation.type, annotation.value, annotation.image_id, annotation.createdAt, annotation.updatedAt))
		self.commit_and_close_db()

	def update_annotation(self, annotation):
		cursor = self.get_cursor()
		annotation.updatedAt = datetime.now().isoformat()
		cursor.execute("UPDATE annotations SET type = ?, value = ?, updatedAt = ? WHERE id = ?", (annotation.type, annotation.value, annotation.updatedAt, annotation.id))
		self.commit_and_close_db()
	
	def delete_annotation(self, id):
		cursor = self.get_cursor()
		cursor.execute(f"DELETE FROM annotations WHERE id = ?", (id,))
		self.commit_and_close_db()

	def get_annotation_by_image_id(self, image_id, value, type):
		cursor = self.get_cursor()
		cursor.execute(f"SELECT * FROM annotations WHERE image_id = ? AND value = ? AND type = ?", (image_id, value, type))
		return cursor.fetchone()
