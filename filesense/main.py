from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
import os
import shutil

from filesense.classifier import classify
from filesense.logger import logger
from filesense.config import config
from filesense.database import Database

db = Database(config["db_path"])

IGNORED_EXTENSIONS = (".tmp", ".crdownload", ".part")


def wait_until_stable(filepath: str, checks: int = 3, interval: int = 1) -> bool:
    """Poll file size until it stops changing (download finished writing)."""
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


def safe_move(src: str, dest: str, retries: int = 5, delay: int = 1) -> bool:
    for attempt in range(retries):
        try:
            shutil.move(src, dest)
            return True
        except PermissionError as e:
            logger.error("Move failed (attempt %d/%d): %s", attempt + 1, retries, e)
            time.sleep(delay)
    logger.error("Failed to move %s after %d attempts.", src, retries)
    return False


def process_file(filepath: str) -> None:
    if not wait_until_stable(filepath):
        logger.info("Skipping %s — file not stable or disappeared.", filepath)
        return

    filename = os.path.basename(filepath)
    extension = os.path.splitext(filename)[1].lower()

    if extension in IGNORED_EXTENSIONS:
        return

    time.sleep(3 if extension == ".exe" else 1)  # give AV scanner more time on installers

    logger.info("New file detected: %s", filepath)
    result = classify(filepath)
    category = result.get("category", "Uncategorized")
    confidence = result.get("confidence")

    folder_name = config["categories"].get(category, category)
    destination_folder = os.path.join(config["sorted_folder"], folder_name)
    os.makedirs(destination_folder, exist_ok=True)

    destination_file = os.path.join(destination_folder, filename)

    if os.path.exists(destination_file):
        base, ext = os.path.splitext(filename)
        n = 1
        while os.path.exists(destination_file):
            destination_file = os.path.join(destination_folder, f"{base} ({n}){ext}")
            n += 1

    moved = safe_move(filepath, destination_file)

    if moved:
        db.save_history(filepath, destination_file, category, confidence)
        logger.info("Moved %s to %s", filename, destination_folder)
    else:
        logger.error("Could not move %s — still locked after retries.", filename)


class DownloadHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        process_file(event.src_path)


def main() -> None:
    watch_folder = config["watch_folder"]
    if not watch_folder or not os.path.isdir(watch_folder):
        logger.error("watch_folder is not set or does not exist: %s", watch_folder)
        return

    event_handler = DownloadHandler()
    observer = Observer()
    observer.schedule(event_handler, watch_folder, recursive=False)
    observer.start()
    logger.info("FileSense watching: %s", watch_folder)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    main()
