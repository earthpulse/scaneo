import sqlite3
import os
import stat


def get_cache_dir():
    home_dir = os.path.expanduser("~")
    cache_dir = os.path.join(home_dir, ".cache/scaneo/")
    if not os.path.exists(cache_dir):
        os.makedirs(cache_dir)
    return cache_dir


def check_permissions(path):
    st = os.stat(path)
    return bool(st.st_mode & stat.S_IWUSR)


def create_database(name, verbose=False):
    db_path = get_cache_dir() + f"{name}.db"
    if not check_permissions(get_cache_dir()):
        print("No write permissions in cache directory")
        return False
    if os.path.exists(db_path):
        if verbose:
            print("Database already exists")
        return False
    if verbose:
        print("Creating database")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(
        f"CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, value TEXT)"
    )
    conn.commit()
    conn.close()
    return True


def persist_dict_in_db(name, dict, verbose=False):
    if verbose:
        print("Persisting dict in db")
    conn = sqlite3.connect(get_cache_dir() + f"{name}.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM cache")
    cursor.executemany(
        "INSERT INTO cache (key, value) VALUES (?, ?)",
        [(img["name"], str(",".join(map(str, img["bbox"])))) for img in dict],
    )
    conn.commit()
    conn.close()


def get_dict_from_db(name):
    conn = sqlite3.connect(get_cache_dir() + f"{name}.db")
    cursor = conn.cursor()
    cursor.execute("SELECT key, value FROM cache")
    rows = cursor.fetchall()
    return [
        {"name": row[0], "bbox": list(map(float, row[1].split(",")))} for row in rows
    ]
