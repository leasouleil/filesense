from filesense.database import Database
from filesense.config import config

db = Database(config["db_path"])


def get_history(limit: int = 50):
    return db.get_history(limit)


def search_history(query: str):
    return db.search(query)


def get_history_record(history_id: int):
    return db.get_record(history_id)


def undo_history(history_id: int):
    return db.undo(history_id)