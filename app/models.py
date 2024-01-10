from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(256))
    create_time = db.Column(db.DateTime, index=True)
    # Role=admin,holder,customer
    role = db.Column(db.String(64),default='customer')
    commenttables = db.relationship("Commenttable", backref="user",lazy="dynamic")
    avatar = db.Column(db.String(256))
    contents = db.relationship("Content",backref='user',lazy="dynamic")
    
    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject=db.Column(db.String(256))
    img=db.Column(db.String(256))
    content=db.Column(db.Text)
    timestamp=db.Column(db.DateTime)
    isRead = db.Column(db.Boolean,default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    commenttables = db.relationship("Commenttable", backref="content", lazy="dynamic")

class Commenttable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment=db.Column(db.Text)
    timestamp=db.Column(db.DateTime)
    content_id = db.Column(db.Integer, db.ForeignKey("content.id"))    
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

@login.user_loader
def load_user(id):
    return User.query.get(int(id))