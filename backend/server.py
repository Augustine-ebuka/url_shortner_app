# Import flask and datetime module for showing date and time
from flask import Flask, url_for, redirect, request, jsonify, session
import datetime, string, random
from flask_cors import CORS, cross_origin
import json 
from flask_bcrypt import Bcrypt
from model.userModel import User,Link, db
from werkzeug.urls import url_parse



# Initializing flask app
app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS for all routes
app.config['CORS_HEADERS'] = 'Content-Type'
bcrypt = Bcrypt(app)

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ushortDatabase.db"
app.config['SECRET_KEY'] = '747qhh7dhn20u3ufh'

# initialize the app with the extension
db.init_app(app)


 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True 
with app.app_context():
    db.create_all()

# generated_url = {}


@app.route("/users")
def user_list():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars()
    return (users)


# User A
@app.route("/users/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        email = request.json['email']
        password = request.json['password']

        # check if user exists before inserting into the database
        user_exists = User.query.filter_by(email=email).first()

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        # hash password for security reasons
        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        response = jsonify({
            "id": new_user.id,
            "email": new_user.email,
            "created_at": new_user.created_at,
            "message": "User created successfully"
        })
        # function that add a default link for every new user
        add_default_link(new_user.id)

        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Credentials', 'true')

        return response, 200




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
        
        # keep id of user signed in
        session["user_id"] = user.id
        

        return jsonify({
            "id": user.id,
            "email": user.email,
            "message": "login successful",
        })


#check if user is logged in
@app.route("/users/signin/is_logged_in")
def user_login():
       # check user session
    user = session.get('user_id')
    user_db = db.session.query(User).filter(User.id == user).first()
    if user_db is None:
          return jsonify({"login":False}), 401
    
    user_db.login = True
    db.session.commit()
    return jsonify({"login":True, "username":user_db.email}), 200
    
     


# logout user
@app.route('/users/logout')
def logout_user():
    user_id = session.get('user_id')
    if user_id is None:
        return jsonify({"message": "alredy out"}), 401
   
    session.pop('user_id')
    return jsonify({"message": "User logged out successfully"}), 200


        
# user profile
@app.route('/users/profile')
def user_profile():
    user_id = session.get('user_id')

    if user_id is None:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter(User.id == user_id).first()

    if user is None:
        return jsonify({"error": "User not found"}), 404

    links = []
    for link in user.links:
        link_data = {
            "id": link.id,
            "short_url": link.short_url,
            "long_url": link.long_url,
            # Include other attributes you want to include
        }
        links.append(link_data)

    return jsonify({"user": {
        "id": user.id,
        "first": user.first_name,
        "links": links
    }})

        

# funtion to genrate six random strings
def generate_random(num_string):
    rand_char = "". join(random.choices(string.ascii_letters + string.digits, k = num_string))
    # note: in the future i can apply timestamps to collision-restricted
    if rand_char:
        return rand_char
    else:
        return ValueError
    
# function that return url name
def get_domain(long_url):
    parsed_url = url_parse(long_url)
    domain = parsed_url.netloc
    domain_parts = domain.split('.')
    if len(domain_parts) > 1:
        desired_part = domain_parts[1]
        return desired_part
    return "Invalid URL"

# Home Generate shiort url
@app.route('/', methods=['GET', 'POST'])
def shorturl():
    if request.method == 'POST':
        user_id = session.get('user_id')
        if user_id is None:
            return jsonify({"error": "Unauthenticated"}), 401
        
        long_url = request.json['long_url']
        short_url_slug = generate_random(6)
        shortend_url = Link.query.filter(Link.slug == short_url_slug).first()
        
        # check if slug(random generated string) already exists in db
        if shortend_url:
            short_url_slug = generate_random(6)

        # add to database the slug
        short_url = "{}{}".format(request.url_root,short_url_slug)
        title = get_domain(long_url)
        user_id = session.get('user_id')
        add_link = Link(short_url=short_url, long_url=long_url, slug = short_url_slug, title=title, user_id=user_id )
        db.session.add(add_link)
        db.session.commit()
        if add_link:
            return jsonify({"message": "added link successfully", "short_url": add_link.short_url, "long_url": add_link.long_url, "title": add_link.title, "link_id":add_link.id}), 200
        else:
            return {"message":"unable to get the long url"}, 500


# redirection route
@app.route("/<slug>", methods=["GET", "POST"])
def redirect_url(slug):
    link = Link.query.filter_by(slug=slug).first()
    
    if link:
        link.clicks += 1
        db.session.commit()
        return redirect(link.long_url)

    return jsonify({"error": "Link not found"}), 404



# get users links
@app.route("/users/links", methods=["GET", "POST"])
def user_links():
    # Run Authentication
    user = session.get('user_id')
    user_exist = User.query.filter(User.id == user).first()
    
    if user_exist is None:
        return jsonify({"error": "Unauthenticated"}), 401

    user_links = user_exist.links

    links_data = []  # List to store link data

    for link in user_links:
        link_data = {
            "short_url": link.short_url,
            "long_url": link.long_url,
            "clicks": link.clicks,
            "slug": link.slug,
            "title": link.title,
            "created_at": link.created_at,
            "id": link.id,
            # Include other attributes you want to include in the response
        }
        links_data.append(link_data)  # Append link data to the list

    return jsonify({"message":"success","links": links_data, "num_of_links":len(links_data)})  # Return the list of links as JSON


# edit link
@app.route("/user/links/edit/<id>", methods=["PATCH"])
def edit_link(id):
    # Run Authentication
    user = session.get('user_id')
    user_exist = User.query.filter(User.id == user).first()
    
    if user_exist is None:
        return jsonify({"error": "Unauthenticated"}), 401
    
    new_slug = request.json.get('new_slug')  # Use request.json.get() to retrieve the new_slug value from the request
    
    # Find the link to edit
    link_to_edit = Link.query.filter(Link.id == id).first()
    
    if link_to_edit is None:
        return jsonify({"error": "Link not found"}), 404
    
    # Update the link attributes

    link_to_edit.slug = new_slug
    new_short_url = "{}{}".format(request.url_root,new_slug)
    link_to_edit.short_url = new_short_url
    
    db.session.commit()  # Commit the changes to the
    return jsonify({"message": "success", "link_to_edit": link_to_edit.slug})

# Delete link
@app.route("/user/links/delete/<id>", methods=["DELETE"])
def delete_link(id):
    # Run Authentication
    user = session.get('user_id')
    user_exist = User.query.filter(User.id == user).first()
    
    if user_exist is None:
        return jsonify({"error": "Unauthenticated"}), 401
    
    # Find the link to delete
    link_to_delete = Link.query.filter(Link.id == id).first()
    
    if link_to_delete is None:
        return jsonify({"error": "Link not found"}), 404
    
    # Delete the link
    db.session.delete(link_to_delete)
    db.session.commit()  # Commit the changes to the database
    
    return jsonify({"message": "Link deleted successfully"}),200

# insert a default link for new users
def add_default_link(user_id):
     url= request.url_root
     rand_str = generate_random(6)
     short_url = "{}{}".format(url,rand_str)
     default_link = Link(short_url =short_url,long_url ="http://localhost:3000/dashboard", title= "Ushort | Power With Every Link",slug = rand_str, user_id= user_id)
     db.session.add(default_link)
     db.session.commit()

# # Running app
if __name__ == '__main__':
    app.run(debug=True)
