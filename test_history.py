from database import get_history, sqlite3

history = get_history()

for row in history:
    print(row)

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