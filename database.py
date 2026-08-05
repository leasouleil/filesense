import sqlite3

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