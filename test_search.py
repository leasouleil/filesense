from database import search_files

results = search_files("git")

for row in results:
    print(row)