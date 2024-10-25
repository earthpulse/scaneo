from datetime import datetime

from .DBRepo import DBRepo
from ..models import Plugin

class PluginsDBRepo(DBRepo):
    def __init__(self):
        super().__init__()
        cursor = self.get_cursor()
        cursor.execute(f"""CREATE TABLE IF NOT EXISTS plugins (
            id TEXT NOT NULL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            enabled BOOLEAN NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )""")
        self.commit_and_close_db()
        self.plugins = ['eotdl']
        self.init_plugins()
        
    def init_plugins(self):
        for i, plugin in enumerate(self.plugins, start=1):
            data = self.retrieve_plugin(plugin)
            if not data:
                plugin = Plugin(id=plugin, name=plugin)
                self.add_plugin(plugin)
        # delete all plugins in table that are not in plugins
        cursor = self.get_cursor()
        cursor.execute(f"DELETE FROM plugins WHERE name NOT IN ({', '.join(['?' for _ in self.plugins])})", self.plugins)
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
        cursor.execute(f"INSERT INTO plugins (id, name, enabled, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)", (plugin.id, plugin.name, plugin.enabled, plugin.createdAt, plugin.updatedAt))
        self.commit_and_close_db()

    def update_plugin(self, plugin):
        cursor = self.get_cursor()
        plugin.updatedAt = datetime.now().isoformat()
        cursor.execute(f"UPDATE plugins SET enabled = ?, updatedAt = ? WHERE id = ?", (plugin.enabled, plugin.updatedAt, plugin.id))
        self.commit_and_close_db()