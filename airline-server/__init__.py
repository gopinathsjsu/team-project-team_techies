import os
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager

from aircraft_api import aircraft_bp
from airport_api import airport_bp
from booking_api import booking_bp
from flight_api import flight_bp
from user_api import user_bp

app = Flask(__name__)

app.config['SECRET_KEY'] = "airline_dev"

app.config['MONGODB_SETTINGS'] = {
    'db': 'airline_db',
    'host': 'localhost', #$(DB_HOST)
    'port': 27017
}

db = MongoEngine()
jwt = JWTManager()

db.init_app(app)
jwt.init_app(app)

blueprints = (user_bp, flight_bp, airport_bp, aircraft_bp, booking_bp)

for blueprint in blueprints:
    app.register_blueprint(blueprint)


@app.route('/')
def hello():
    return 'Airline App!'





