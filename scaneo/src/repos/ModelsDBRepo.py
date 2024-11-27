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
            task TEXT NOT NULL
        )""")
        self.commit_and_close_db()

    def retrieve_models(self):
        cursor = self.get_cursor()
        cursor.execute("SELECT id, name, description, url, createdAt, updatedAt, task FROM models")
        return cursor.fetchall()
    
    def create_model(self, model):
        cursor = self.get_cursor()
        cursor.execute(f"INSERT INTO models (id, name, description, url, createdAt, updatedAt, task) VALUES (?, ?, ?, ?, ?, ?, ?)", (model.id, model.name, model.description, model.url, model.createdAt, model.updatedAt, model.task))
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
        cursor.execute("SELECT id, name, description, url, createdAt, updatedAt, task FROM models WHERE id = ?", (model_id,))
        return cursor.fetchone()