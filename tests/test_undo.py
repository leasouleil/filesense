from filesense.database import Database

db = Database("filesense.db")
success = db.undo(1)

if success:
    print("Undo successful")
else:
    print("Undo failed")
