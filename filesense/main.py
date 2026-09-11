from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

import time
import os
import shutil
from threading import Lock

from filesense.classifier import classify
from filesense.logger import logger
import filesense.config as config_module
from filesense.database import Database


db = Database(config_module.resolve_path(config_module.config["db_path"]))

IGNORED_EXTENSIONS = (".tmp", ".crdownload", ".part")

_observer = None
_observer_lock = Lock()


def wait_until_stable(
    filepath: str,
    checks: int = 3,
    interval: int = 1,
) -> bool:
    """Poll file size until it stops changing (download finished writing)."""
    last_size = -1
    stable_count = 0

    while stable_count < checks:
        try:
            current_size = os.path.getsize(filepath)
        except FileNotFoundError:
            return False

        if current_size == last_size:
            stable_count += 1
        else:
            stable_count = 0

        last_size = current_size
        time.sleep(interval)

    return True


def safe_move(
    src: str,
    dest: str,
    retries: int = 5,
    delay: int = 1,
) -> bool:
    for attempt in range(retries):
        try:
            shutil.move(src, dest)
            return True

        except PermissionError as e:
            logger.error(
                "Move failed (attempt %d/%d): %s",
                attempt + 1,
                retries,
                e,
            )
            time.sleep(delay)

    logger.error(
        "Failed to move %s after %d attempts.",
        src,
        retries,
    )
    return False


def process_file(filepath: str) -> None:
    if not wait_until_stable(filepath):
        logger.info(
            "Skipping %s — file not stable or disappeared.",
            filepath,
        )
        return

    filename = os.path.basename(filepath)
    extension = os.path.splitext(filename)[1].lower()

    if extension in IGNORED_EXTENSIONS:
        return

    # Give antivirus scanners more time on installers.
    time.sleep(3 if extension == ".exe" else 1)

    logger.info("New file detected: %s", filepath)

    result = classify(filepath)

    category = result.get("category", "Uncategorized")
    confidence = result.get("confidence")

    config = config_module.config

    folder_name = config["categories"].get(category, category)
    destination_folder = os.path.join(
        config_module.resolve_path(config["sorted_folder"]),
        folder_name,
    )

    os.makedirs(destination_folder, exist_ok=True)

    destination_file = os.path.join(
        destination_folder,
        filename,
    )

    if os.path.exists(destination_file):
        base, ext = os.path.splitext(filename)
        n = 1

        while os.path.exists(destination_file):
            destination_file = os.path.join(
                destination_folder,
                f"{base} ({n}){ext}",
            )
            n += 1

    moved = safe_move(filepath, destination_file)

    if moved:
        db.save_history(
            filepath,
            destination_file,
            category,
            confidence,
        )

        logger.info(
            "Moved %s to %s",
            filename,
            destination_folder,
        )
    else:
        logger.error(
            "Could not move %s — still locked after retries.",
            filename,
        )


class DownloadHandler(FileSystemEventHandler):

    def on_created(self, event):
        if event.is_directory:
            return

        process_file(event.src_path)


def start_watcher() -> bool:
    """Start the FileSense watchdog observer."""
    global _observer

    with _observer_lock:
        if _observer is not None and _observer.is_alive():
            logger.info("FileSense watcher is already running.")
            return True

        config = config_module.config

        watch_folder = config_module.resolve_path(config["watch_folder"])

        if not watch_folder or not os.path.isdir(watch_folder):
            logger.error(
                "watch_folder is not set or does not exist: %s",
                watch_folder,
            )
            return False

        event_handler = DownloadHandler()

        observer = Observer()

        observer.schedule(
            event_handler,
            watch_folder,
            recursive=False,
        )

        observer.start()

        _observer = observer

        logger.info(
            "FileSense watching: %s",
            watch_folder,
        )

        return True


def stop_watcher() -> None:
    """Stop the FileSense watchdog observer."""
    global _observer

    with _observer_lock:
        if _observer is None:
            return

        logger.info("Stopping FileSense watcher...")

        _observer.stop()
        _observer.join()

        _observer = None

        logger.info("FileSense watcher stopped.")


def is_watcher_running() -> bool:
    """Return whether the FileSense watcher is currently running."""
    with _observer_lock:
        return _observer is not None and _observer.is_alive()


def main() -> None:
    """Run FileSense as a standalone watcher process."""
    if not start_watcher():
        return

    try:
        while is_watcher_running():
            time.sleep(1)

    except KeyboardInterrupt:
        logger.info("Keyboard interrupt received.")

    finally:
        stop_watcher()


if __name__ == "__main__":
    main()