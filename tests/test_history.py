from filesense.database import Database

db = Database("filesense.db")
history = db.get_history()

for row in history:
    print(row)
