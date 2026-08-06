import sqlite3
import shutil
import os

def initialize_database():

    conn = sqlite3.connect("filesense.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS file_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    category TEXT,
    original_path TEXT,
    new_path TEXT,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    )
    """)

    conn.commit()
    conn.close()

def save_history(
        filename,
        category,
        original_path,
        new_path
        ):
    conn = sqlite3.connect("filesense.db")
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO file_history
    (
        filename,
        category,
        original_path,
        new_path
    )
    VALUES (?, ?, ?, ?)
""", (
    filename,
    category,
    original_path,
    new_path
))

    conn.commit()
    conn.close()

def get_history():

    conn = sqlite3.connect("filesense.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM file_history
        ORDER BY processed_at DESC
    """)

    rows = cursor.fetchall()

    conn.close()

    return rows

def search_files(keyword):

    conn = sqlite3.connect("filesense.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM file_history
        WHERE filename LIKE ?
        ORDER BY processed_at DESC
    """, (f"%{keyword}%",))

    results = cursor.fetchall()

    conn.close()
    
    return results

def get_record(record_id):

    conn = sqlite3.connect("filesense.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM file_history WHERE id = ?",
        (record_id,)
    )

    row = cursor.fetchone()

    conn.close()

    return row

def undo_move(record_id):

    record = get_record(record_id)

    if not record:
        return False

    original_path = record[2]
    new_path = record[3]

    if not os.path.exists(new_path):
        return False

    os.makedirs(
        os.path.dirname(original_path),
        exist_ok = True
    )

    shutil.move(new_path, original_path)

    return True