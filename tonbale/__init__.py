from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'a15182c1ag182aa5cc7263439191b86d'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

db = SQLAlchemy(app) #instance of database
bcrypt = Bcrypt(app) #instance of encrypter
login_manager = LoginManager(app)
login_manager.login_view = 'login' #the function name (route) of the page to navigate to, if a user is not logged in and lands on a page that requires login.
#login_manager.login_message_category = 'info' # set the category (css) of the info flash message


#routes must be imported into __init__ otherwise pages cannot be accesed
#done after creating app object to avoid circular importing (as routes imports the app object)
from tonbale import routes