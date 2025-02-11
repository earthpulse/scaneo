import sqlite3
import os
import stat
import uuid

def check_permissions(path):
    st = os.stat(path)
    return bool(st.st_mode & stat.S_IWUSR)

class DBRepo:
    def __init__(self):
        home_dir = os.path.expanduser("~")
        cache_dir = os.path.join(home_dir, ".cache/scaneo/")
        if not os.path.exists(cache_dir):
            os.makedirs(cache_dir)
        if not check_permissions(cache_dir):
            print("No write permissions to cache directory")
        self.db_path = cache_dir + 'scaneo.db'
        # if os.path.exists(db_path):
        #     print("Database already exists")
        # else:
        #     print("New database created")
        

    def get_cursor(self):
        self.db = sqlite3.connect(self.db_path)
        return self.db.cursor()

    def commit_and_close_db(self):
        self.db.commit()
        self.db.close()

    def generate_id(self):
        return str(uuid.uuid4())

    # def create(self, data):
    # 	self.db.append(data)
    # 	return data
