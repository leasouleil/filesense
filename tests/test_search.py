from filesense.database import Database

db = Database("filesense.db")
results = db.search("valorant")

for row in results:
    print(row)
