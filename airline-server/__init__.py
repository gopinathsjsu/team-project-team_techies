import os
from flask import Flask
from flask_restful import Api
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager

from api.flight import flight_bp
from user import user_bp

app = Flask(__name__)
api = Api(app)

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



