import os 
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).resolve().parent


def get_env_vars(name, default):
    env = os.getenv(name)
    if not env:
        if not default:
            raise ValueError(f"{name} is not set")
        return default
    return env


def inject_current_year():
    return {"year": datetime.now().year}