import os
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager, get_jwt_identity

from api.flight import flight_bp
from user import user_bp

app = Flask(__name__)

app.config['SECRET_KEY'] = "airline_dev"

app.config['MONGODB_SETTINGS'] = {
    'db': 'airline_db',
    'host': 'localhost',
    'port': 27017
}

db = MongoEngine()
jwt = JWTManager()

db.init_app(app)
jwt.init_app(app)

blueprints = (user_bp, flight_bp)

for blueprint in blueprints:
    app.register_blueprint(blueprint)


@app.route('/')
def hello():
    return 'Airline App!'



