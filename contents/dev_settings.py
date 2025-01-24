from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_vite import Vite

from . import utils

# Flask app configuration
app = Flask(
    __name__,
    template_folder=str(utils.BASE_DIR / "assets/templates"),
    static_folder=str(utils.BASE_DIR / "assets/static"),
)
app.config["SECRET_KEY"] = utils.get_env_vars("SECRET_KEY", "top secret")

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{utils.BASE_DIR}/db.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Vite configuration
app.config["VITE_AUTO_INSERT"] = True
vite = Vite(app)

from .models import Project, Contact
from .admin import ProjectAdminView, ContactAdminView
from .views import IndexView

# Admin setup
admin = Admin(app, name="Portfolio")

admin.add_view(ProjectAdminView(Project, db.session))
admin.add_view(ContactAdminView(Contact, db.session))

# URL rules for views
app.add_url_rule("/", view_func=IndexView.as_view("index"), defaults={"path": ""})
app.add_url_rule("/<path:path>/", view_func=IndexView.as_view("index_with_path"))

