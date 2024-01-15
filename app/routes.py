from app import app 
from flask import request, render_template,jsonify, redirect, url_for,flash,abort
from flask_login import current_user, login_user, login_required, logout_user
from werkzeug.utils import secure_filename
from app.models import *
import datetime , os 
from app.forms import *
import sqlalchemy as sa
import PIL
import markdown
from PIL import Image
from urllib.parse import urlsplit
from flask import send_from_directory
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
def allowed_file(filename):
    # Check if the filename has a valid file extension
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
def save_img(pic):
    if pic and allowed_file(pic.filename):  # Add a check for allowed file types
        p_name = secure_filename(pic.filename)
        image_path = os.path.join(os.getcwd(), 'app', 'static', 'images', 'cover', p_name)
        try:
            i = Image.open(pic)
            i.save(image_path)
            return p_name
        except PIL.UnidentifiedImageError as e:
            print(f"Error saving image: {e}")
            return None  # or handle the error accordingly
    else:
        print("No file or invalid file type detected.")
        return None  # or handle the absence of a valid file


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(os.getcwd(), 'static','favicon'),
                          'favicon.ico',mimetype='image/vnd.microsoft.icon')

@app.route('/')
@app.route("/index")

def index():
    contents=Content.query.order_by(Content.id.desc())

   
    return render_template('index.html',
                           title="PaperTexts",
                           contents=contents,)
@app.route('/posts')
def posts():
    contents=Content.query.order_by(Content.id.desc())
    

    return render_template('posts.html',
                           title='All Posts',
                           contents=contents,
                           

    )

@app.route('/write')
@login_required
def write():
    form=WriteForm()
    return render_template("write.html",
                           title='Write | PaperTexts',
                           form=form)
@app.route('/write_post',methods=['GET','POST'])
@login_required
def write_post():
    form=WriteForm()
    if request.method=='POST':
        subject=form.title.data 
        content=markdown.markdown(form.content.data) 
        img=save_img(form.img.data)
        timestamp=datetime.datetime.now()
        c= Content(
            subject=subject,
            img=img,
            content=content,
            timestamp=timestamp,
            user_id=current_user.id,
        )
        db.session.add(c)
        db.session.commit()
        
        return redirect(url_for('index'))
    return render_template('write.html', form=form)

@app.route("/download/<path:filename>", methods=['GET', 'POST'])
def download(filename):
    upload_directory = os.path.join(os.getcwd(), 'app', 'static')
    path_file = os.path.join(upload_directory, "gpg", filename)

    print("File path:", path_file)

    if os.path.exists(path_file):
        return send_from_directory(
            directory=upload_directory,
            path="gpg",  # This should be the subdirectory relative to upload_directory
            filename=filename
        )
    else:
        print("File not found:", path_file)
        abort(404)


@app.route('/content/<int:id>')
def content(id):
    c=Content.query.get(id)
    return render_template("content.html",
                           title='Content | PaperTexts',
                           c=c)
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if request.method=='POST':
        
       
        user = db.session.scalar(
            sa.select(User).where(User.username == form.username.data ))
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or urlsplit(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Login | PaperTexts',form=form)
    

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    
    if request.method=='POST':
        
        user = User(username=form.username.data, 
                    email=form.email.data,
                    create_time=datetime.datetime.now(),
                    avatar='avatar.png')
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        
        
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register | PaperTexts',form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    print('logout')
    return redirect(url_for('login'))

@app.context_processor
def inject_now():
    return {'now': datetime.datetime.now()}