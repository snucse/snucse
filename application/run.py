from setting import session_key, redis_pass
from flask import *
import hashlib, redis

snucse = Flask(__name__)

@snucse.route('/')
def home():
    if ('Loged_in' in session) and session['Loged_in'] == 'true':
        return render_template('main.html')
    else:
#        return render_template('login.html')
        return render_template('main.html')

@snucse.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        print("Got Post")
        print(request.form['title'])
        return "Got It"

@snucse.route('/<path:all>')
def reset(all):
    return redirect(url_for('home'))

if __name__ == '__main__':
    snucse.run(host = '0.0.0.0', port = 12321, debug = False)
