import threading

import uvicorn

from filesense.api import app
from filesense.logger import logger
from filesense.main import start_watcher, stop_watcher


def run_api() -> None:
    """Run the FastAPI server."""
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
    )


def main() -> None:
    """Start the FileSense backend."""
    logger.info("Starting FileSense backend...")

    if not start_watcher():
        logger.error("FileSense watcher could not be started.")
        return

    api_thread = threading.Thread(
        target=run_api,
        daemon=True,
    )

    api_thread.start()

    logger.info("FileSense API running on http://127.0.0.1:8000")

    try:
        api_thread.join()

    except KeyboardInterrupt:
        logger.info("Keyboard interrupt received.")

    finally:
        stop_watcher()
        logger.info("FileSense backend stopped.")


if __name__ == "__main__":
    main()