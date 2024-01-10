import os 

basedir = os.path.abspath(os.path.dirname(__file__))
class Config(object):
    
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'IBUPROFEN'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '').replace(
        'postgres://', 'postgresql://') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://bbird4450028:rbr463009@localhost/pos' 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    POSTS_PER_PAGE = 10