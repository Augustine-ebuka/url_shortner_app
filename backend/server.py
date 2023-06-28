# Import flask and datetime module for showing date and time
from flask import Flask, url_for, redirect, request, jsonify, session
import datetime, string, random
from flask_cors import CORS, cross_origin
import json 
from flask_bcrypt import Bcrypt
from model import db, User



# Initializing flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['CORS_HEADERS'] = 'Content-Type'
bcrypt = Bcrypt(app)

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ushort.db"
app.config['SECRET_KEY'] = 'hebrus98$'

# initialize the app with the extension
db.init_app(app)


 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True 
with app.app_context():
	db.create_all()

generated_url = {}

@app.route("/users")
def user_list():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars()
    return (users)


# User Authentication(sign up)
@app.route("/users/signup", methods=["POST"])
def signup():
	if request.method == "POST":
		first_name = request.json['first_name']
		last_name = request.json['last_name']
		email = request.json['email']
		password = request.json['password']
		
		# check if user exist before inserting into the database
		user_exists = User.query.filter_by(email=email).first()

		if user_exists:
			return jsonify({"error": "user already exists"}), 409
		
		# hash password for security reasons
		hashed_password = bcrypt.generate_password_hash(password)
		new_user = User(first_name= first_name,last_name=last_name,email=email, password=hashed_password)
		db.session.add(new_user)
		db.session.commit()
		return jsonify({
			"id": new_user.id,
    	  "email": new_user.email,
	      "message": "User created successfully"
		}), 200

# User Authentication(sign in)
@app.route("/users/signin", methods=["POST"])
def signin():
	if request.method == "POST":
		email = request.json['email']
		password = request.json['password']

		# check user existence
		user =  User.query.filter(User.email == email).first()
		if user is None:
			return jsonify({"error":"user does not exist"}), 401
		
		if not bcrypt.check_password_hash(user.password, password):
			return jsonify({"error":"UnAuthenticated"}), 401
		
		session["user_id"] = user.id
  
		return jsonify({
			"id": user.id,
			"email": user.email,
			"message": "login successful"
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
		

# # Running app
if __name__ == '__main__':
	app.run(debug=True)
