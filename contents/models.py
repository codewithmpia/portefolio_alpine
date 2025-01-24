from datetime import datetime, timezone
from slugify import slugify

from .settings import db

class Project(db.Model):
    __tablename__ = "projects"
    title = db.Column(db.String(255), nullable=False, unique=True)
    slug = db.Column(db.String(255), nullable=True, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.Unicode(128), nullable=True)
    link = db.Column(db.String(255), nullable=False, default="https://github.com/codewithmpia")
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    publish = db.Column(db.Boolean, default=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.generate_slug()

    def generate_slug(self):
        if self.title:
            self.slug = slugify(self.title)
        else:
            self.slug = ""

    def to_dict(self):
        return {
            "title": self.title,
            "slug": self.slug,
            "description": self.description,
            "image": self.image,
            "link": self.link,
            "created_at": self.created_at.isoformat(),
            "publish": self.publish,
        }

    def __repr__(self):
        return self.title
    

class Contact(db.Model):
    __tablename__ = "contacts"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def __repr__(self):
        return self.name
    

