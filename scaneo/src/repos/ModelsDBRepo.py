from .DBRepo import DBRepo

class ModelsDBRepo(DBRepo):
    def __init__(self):
        super().__init__()
        cursor = self.get_cursor()
        cursor.execute(f"""CREATE TABLE IF NOT EXISTS models (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            description TEXT NOT NULL,
            url TEXT NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL,
            task TEXT NOT NULL,
            preprocessing TEXT NULL,
            postprocessing TEXT NULL
        )""")
        self.commit_and_close_db()

    def retrieve_models(self):
        cursor = self.get_cursor()
        cursor.execute("SELECT id, name, description, url, createdAt, updatedAt, task, preprocessing, postprocessing FROM models")
        return cursor.fetchall()
    
    def retrieve_models_by_ids(self, ids):
        cursor = self.get_cursor()
        placeholders = ','.join(['?' for _ in ids])
        cursor.execute(f"SELECT id, name, description, url, createdAt, updatedAt, task, preprocessing, postprocessing FROM models WHERE id IN ({placeholders})", ids)
        return cursor.fetchall()
    
    def create_model(self, model):
        cursor = self.get_cursor()
        cursor.execute(f"INSERT INTO models (id, name, description, url, createdAt, updatedAt, task, preprocessing, postprocessing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", (
            model.id, 
            model.name, 
            model.description, 
            model.url, 
            model.createdAt.isoformat(), 
            model.updatedAt.isoformat(), 
            model.task,
            ','.join(model.preprocessing),
            ','.join(model.postprocessing)
        ))
        self.commit_and_close_db()

    def retrieve_model(self, id):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM models WHERE id = ?", (id,))
        return cursor.fetchone()

    def delete_model(self, id):
        cursor = self.get_cursor()
        cursor.execute(f"DELETE FROM models WHERE id = ?", (id,))
        self.commit_and_close_db()

    def retrieve_one_model(self, model_id):
        cursor = self.get_cursor()
        cursor.execute("SELECT id, name, description, url, createdAt, updatedAt, task, preprocessing, postprocessing FROM models WHERE id = ?", (model_id,))
        return cursor.fetchone()