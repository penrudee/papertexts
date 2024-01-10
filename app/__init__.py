from flask import Flask 
from config import Config
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from sqlalchemy import MetaData
from flask_pagedown import PageDown
naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app,metadata=MetaData(naming_convention=naming_convention))
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'login'
csrf=CSRFProtect(app)
pagedown = PageDown(app)
from app import routes, models
