from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
import os
import shutil
from classifier import classify
from pdfreader import extract_pdf_text

def get_text_for_file(filepath):
    extension = os.path.splitext(filepath)[1].lower()

    if extension == ".pdf":
        try:
            return extract_pdf_text(filepath)
        except Exception as e:
            print(f"Could not read PDF: {e}")
            return ""

    # Plain text files — add when you’re ready
    if extension in (".txt", ".md"):
        try:
            with open(filepath, encoding="utf-8", errors="ignore") as f:
                return f.read()
        except Exception as e:
            print(f"Could not read text file: {e}")
            return ""

    return ""

class MyHandler(FileSystemEventHandler):

    def process_file(filepath):
        filename = os.path.basename(filepath)
        extension = os.path.splitext(filename)[1].lower()

        print(filename)
        print(extension)

        ignored_extensions = [".tmp", ".crdownload", ".part"]
        if extension in ignored_extensions:
            return

        time.sleep(1)

        text = get_text_for_file(filepath)
        category = classify(filename, text)

        print(category)

        category = category.strip()
        category = category.split("\n")[0].strip()

        allowed_categories = ["Finance", "School", "Programming", "Personal", "Images"]

        for allowed in allowed_categories:
            if category.lower() == allowed.lower():
                category = allowed
                break

        if category not in allowed_categories:
            print(f"Unknown category: {category}")
            category = "Uncategorized"

        destination_folder = os.path.join("Sorted", category)
        os.makedirs(destination_folder, exist_ok=True)

        destination_file = os.path.join(destination_folder, filename)

        if os.path.exists(destination_file):
            print("Duplicate found")
            base, ext = os.path.splitext(filename)
            dest = destination_file
            n = 1
            while os.path.exists(dest):
                dest = os.path.join(destination_folder, f"{base} ({n}){ext}")
                n += 1
            shutil.move(filepath, dest)
        else:
            shutil.move(filepath, destination_file)

        print(f"Moved {filename} to {destination_folder}")


    def on_created(self, event):
        if event.is_directory:
            return
        self.process_file(event.src_path)

observer = Observer()
handler = MyHandler()

observer.schedule(handler, path="Downloads_Test", recursive=False)

observer.start()

print("watching folder...")

try:
    while True:
        time.sleep(1)
    
except KeyboardInterrupt:
    observer.stop()

observer.join()