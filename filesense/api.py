from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from filesense.config import config, save_config
from filesense.services.history_service import (
    get_history,
    search_history,
    get_history_record,
    undo_history,
)

app = FastAPI(
    title="FileSense API",
    version="1.0.0",
)

@app.get("/api/health")
def health():
    return {"status": "ok"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SettingsUpdate(BaseModel):
    watch_folder: str
    sorted_folder: str
    log_level: str
    ai_backend: str
    local_model: str
    cloud_provider: str
    cloud_api_key: str = ""
    local_base_url: str = "http://localhost:11434"
    categories: dict[str, str]
    start_on_boot: bool = False
    automatic_sorting: bool = True
    theme: str = "system"


@app.get("/api/config")
def get_config():
    return config


@app.put("/api/config")
def update_config(settings: SettingsUpdate):
    updated_config = {
        **config,
        **settings.model_dump(),
    }

    save_config(updated_config)

    return {
        "success": True,
        "config": updated_config,
    }


@app.get("/api/history")
def history(
    limit: int = Query(default=50, ge=1, le=500),
):
    return get_history(limit)


@app.get("/api/history/search")
def history_search(query: str = Query(min_length=1)):
    return search_history(query)


@app.get("/api/history/{history_id}")
def history_record(history_id: int):
    record = get_history_record(history_id)

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="History record not found",
        )

    return record


@app.post("/api/history/{history_id}/undo")
def undo(history_id: int):
    success = undo_history(history_id)

    if not success:
        raise HTTPException(
            status_code=400,
            detail="Unable to undo history record",
        )

    return {"success": True}