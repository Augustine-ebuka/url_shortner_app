from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "client"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    first_name = db.Column(db.String(150), unique=False)
    last_name = db.Column(db.String(150), unique=False)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)