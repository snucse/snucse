from flask import *

snucse = Flask(__name__)

@snucse.route('/')
def home():
    return render_template('main.html')

@snucse.route('/login')
def login_page():
    return render_template('login.html')

@snucse.route('/<path:all>')
def reset(all):
    return redirect(url_for('home'))

if __name__ == '__main__':
    snucse.run(host = '0.0.0.0', port = 12321, debug = False)
