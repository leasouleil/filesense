from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
import os
import shutil
from classifier import classify
from pdfreader import extract_pdf_text
from docxreader import extract_docx_text
from xlsxreader import extract_xlsx_text
from imagereader import extract_image_text
from exereader import extract_exe_metadata
from logger import logger
from config import config
from database import initialize_database, save_history

def wait_until_stable(filepath, checks=3, interval=1):
    last_size = -1
    stable_count = 0

    while stable_count < checks:
        try:
            current_size = os.path.getsize(filepath)
        except FileNotFoundError:
            return False  # file vanished (renamed, deleted, still writing under temp name)

        if current_size == last_size:
            stable_count += 1
        else:
            stable_count = 0

        last_size = current_size
        time.sleep(interval)

    return True


def safe_move(src, dest, retries=5, delay=1):
    for attempt in range(retries):
        try:
            shutil.move(src, dest)
            return True
        except PermissionError as e:
            logger.error(f"Move failed (attempt {attempt + 1}/{retries}): {e}")
            time.sleep(delay)
    logger.error(f"Failed to move {src} after {retries} attempts.")
    return False

def get_text_for_file(filepath):
    extension = os.path.splitext(filepath)[1].lower()

    if extension == ".pdf":
        try:
            return extract_pdf_text(filepath)
        except Exception as e:
            logger.error(f"Could not read PDF: {e}")
            return ""

    if extension == ".docx":
        try:
            return extract_docx_text(filepath)
        except Exception as e:
            logger.error(f"Could not read docx: {e}")
            return ""

    if extension == ".xlsx":
        try:
            return extract_xlsx_text(filepath)
        except Exception as e:
            logger.error(f"Could not read xlsx: {e}")
            return ""

    if extension in (".png", ".jpg", ".jpeg"):
        try:
            return extract_image_text(filepath)
        except Exception as e:
            logger.error(f"Could not read image: {e}")
            return ""

    if extension == ".exe":
        try:
            return extract_exe_metadata(filepath)
        except Exception as e:
            logger.error(f"Could not read exe: {e}")
            return ""

    # Plain text files — add when you’re ready
    if extension in (".txt", ".md"):
        try:
            with open(filepath, encoding="utf-8", errors="ignore") as f:
                return f.read()
        except Exception as e:
            logger.error(f"Could not read text file: {e}")
            return ""

    return ""


def process_file(filepath):
        if not wait_until_stable(filepath):
            logger.info(f"Skipping {filepath} — file not stable or disappeared.")
            return
        
        filename = os.path.basename(filepath)
        extension = os.path.splitext(filename)[1].lower()

        print(filename)
        print(extension)

        ignored_extensions = [".tmp", ".crdownload", ".part"]
        if extension in ignored_extensions:
            return

        if extension == ".exe":
            time.sleep(3)  # give AV scanner more time on installers
        else:
            time.sleep(1)

        text = get_text_for_file(filepath)
        category = classify(filename, text)

        print(category)

        category = category.strip()
        category = category.split("\n")[0].strip()

        allowed_categories = config["allowed_categories"]

        for allowed in allowed_categories:
            if category.lower() == allowed.lower():
                category = allowed
                break

        if category not in allowed_categories:
            print(f"Unknown category: {category}")
            category = "Uncategorized"

        destination_folder = os.path.join(config["sorted_folder"], category)
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
            moved = safe_move(filepath, dest)
        else:
            moved = safe_move(filepath, destination_file)

        if moved:

            save_history(
            filename,
            category,
            filepath,
            destination_file
        )

            logger.info(f"Moved {filename} to {destination_folder}")
        else:
            logger.error(f"Could not move {filename} — still locked after retries.")

class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        process_file(event.src_path)

initialize_database()

observer = Observer()
handler = MyHandler()

observer.schedule(handler, path=config["watch_folder"], recursive=False)

observer.start()

print("watching folder...")

try:
    while True:
        time.sleep(1)
    
except KeyboardInterrupt:
    observer.stop()

observer.join()