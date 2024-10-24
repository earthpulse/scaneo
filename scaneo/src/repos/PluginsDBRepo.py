from .DBRepo import DBRepo
from ..models import Plugin

class PluginsDBRepo(DBRepo):
    def __init__(self):
        super().__init__()
        cursor = self.get_cursor()
        cursor.execute(f"""CREATE TABLE IF NOT EXISTS plugins (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            status TEXT NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )""")
        self.commit_and_close_db()
        self.populate()
        
    def populate(self):
        # libs = ["eotdl", "spai"]
        libs = ["eotdl"]
        for i, lib in enumerate(libs, start=1):
            data = self.retrieve_plugin(lib)
            if not data:
                plugin = Plugin(id=i, name=lib)
                self.add_plugin(plugin)
            else:
                plugin = Plugin.from_tuple(data)
            try:
                exec(f"import {lib}")
                plugin.status = "installed" if plugin.status == "uninstalled" else plugin.status
                print(f"{lib.upper()} is installed, plugin available")
            except:
                print(f"{lib.upper()} is not installed, plugin not available")
                plugin.status = "uninstalled"
                pass
            self.update_plugin(plugin)
        # delete all plugins in table that are not in libs
        cursor = self.get_cursor()
        cursor.execute(f"DELETE FROM plugins WHERE name NOT IN ({', '.join(['?' for _ in libs])})", libs)
        self.commit_and_close_db()


    def retrieve_plugins(self):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM plugins")
        return cursor.fetchall()

    def retrieve_plugin(self, name):
        cursor = self.get_cursor()
        cursor.execute(f"SELECT * FROM plugins WHERE name = ?", (name,))
        return cursor.fetchone()

    def add_plugin(self, plugin):
        cursor = self.get_cursor()
        cursor.execute(f"INSERT INTO plugins (id, name, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)", (plugin.id, plugin.name, plugin.status, plugin.createdAt, plugin.updatedAt))
        self.commit_and_close_db()

    def update_plugin(self, plugin):
        cursor = self.get_cursor()
        cursor.execute(f"UPDATE plugins SET status = ?, updatedAt = ? WHERE id = ?", (plugin.status, plugin.updatedAt, plugin.id))
        self.commit_and_close_db()