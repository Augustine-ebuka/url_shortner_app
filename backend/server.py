# Import flask and datetime module for showing date and time
from flask import Flask, url_for, redirect, request, jsonify, session
import datetime, string, random
from flask_cors import CORS, cross_origin
import json 
from model import db, User





# Initializing flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['CORS_HEADERS'] = 'Content-Type'

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ushort.db"
app.config['SECRET_KEY'] = 'hebrus98$'

# initialize the app with the extension
db.init_app(app)


 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

 

with app.app_context():
	db.create_all()
# ----------------------------------------------------------------
generated_url = {}

@app.route("/users")
def user_list():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars()
    return (users)

@app.route("/users/create", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
   
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


# funtion to genrate six random strings
def generate_random(num_string):
	rand_char = "". join(random.choices(string.ascii_letters + string.digits, k = num_string))
	# note: in the future i can apply timestamps to collision-restricted
	if rand_char:
		return rand_char
	else:
		return ValueError

# Home route
@app.route('/', methods=['GET', 'POST'])
def shorturl():
	if request.method == 'POST':
		long_url = request.form['longurl']
		short_url = generate_random(6)
		while short_url in generated_url:
			short_url = generate_random(6)


		generated_url[short_url] = long_url
		with open("mylink.json", "w") as link:
			json.dump(generated_url, link) 
		if long_url:
			return {"message":"success","short_url": "{}{}".format(request.url_root,short_url)}, 200
		else:
			return {"message":"unable to get the long url"}, 500


# redirection route
@app.route("/<short_url>", methods=["GET", "POST"])
def redirect_url(short_url):
	long_url = generated_url.get(short_url)
	if long_url:
		return redirect(long_url)
	else:
		return "url not found", 500
		

@app.route("/son", methods=["GET", "POST"])
def get_son():
	email = request.json['email']
	password = request.json['password']
	return jsonify({"name": email, "message":"success"})
# # Running app
if __name__ == '__main__':
	app.run(debug=True)
