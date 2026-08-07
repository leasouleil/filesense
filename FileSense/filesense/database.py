import sqlite3
import shutil
import os


class Database:
    def __init__(self, db_path: str = "filesense.db"):
        self.db_path = db_path
        self.initialize_database()

    def _connect(self) -> sqlite3.Connection:
        return sqlite3.connect(self.db_path)

    def initialize_database(self) -> None:
        with self._connect() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    original_path TEXT NOT NULL,
                    new_path TEXT NOT NULL,
                    category TEXT,
                    confidence REAL,
                    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
                    undone INTEGER DEFAULT 0
                )
                """
            )

    def save_history(
        self,
        original_path: str,
        new_path: str,
        category: str = None,
        confidence: float = None,
    ) -> int:
        with self._connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO history (original_path, new_path, category, confidence)
                VALUES (?, ?, ?, ?)
                """,
                (original_path, new_path, category, confidence),
            )
            return cursor.lastrowid

    def get_history(self, limit: int = 50) -> list[dict]:
        with self._connect() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute(
                "SELECT * FROM history ORDER BY timestamp DESC LIMIT ?",
                (limit,),
            )
            return [dict(row) for row in cursor.fetchall()]

    def search(self, query: str) -> list[dict]:
        with self._connect() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute(
                """
                SELECT * FROM history
                WHERE original_path LIKE ? OR new_path LIKE ?
                ORDER BY timestamp DESC
                """,
                (f"%{query}%", f"%{query}%"),
            )
            return [dict(row) for row in cursor.fetchall()]

    def get_record(self, history_id: int) -> dict | None:
        with self._connect() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute("SELECT * FROM history WHERE id = ?", (history_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def undo(self, history_id: int) -> bool:
        record = self.get_record(history_id)
        if not record or record["undone"]:
            return False

        original_path = record["original_path"]
        new_path = record["new_path"]

        if not os.path.exists(new_path):
            return False

        os.makedirs(os.path.dirname(original_path), exist_ok=True)
        shutil.move(new_path, original_path)

        with self._connect() as conn:
            conn.execute("UPDATE history SET undone = 1 WHERE id = ?", (history_id,))

        return True

    def undo_latest(self) -> bool:
        with self._connect() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute(
                "SELECT id FROM history WHERE undone = 0 ORDER BY id DESC LIMIT 1"
            )
            row = cursor.fetchone()

        if not row:
            return False

        return self.undo(row["id"])
