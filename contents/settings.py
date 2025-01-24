from pathlib import Path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

BASE_DIR = Path(__file__).resolve().parent

# Flask app configuration
app = Flask(
    __name__,
    template_folder=str(BASE_DIR / "assets/templates"),
    static_folder=str(BASE_DIR / "assets/static"),
)
app.config["SECRET_KEY"] = "88@+b06w003lv0d7=&eifdjm^-2ae)w@@n$23gxwaar1zm4rde"

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{BASE_DIR}/db.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# URL rules for views
from .views import IndexView

app.add_url_rule("/", view_func=IndexView.as_view("index"), defaults={"path": ""})
app.add_url_rule("/<path:path>/", view_func=IndexView.as_view("index_with_path"))

