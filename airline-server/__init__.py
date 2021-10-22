import os
from flask import Flask
from flask_restful import Api
from flask_mongoengine import MongoEngine

from user_resource import UserRegistration, UserLogin

app = Flask(__name__)
api = Api(app)

app.config['MONGODB_SETTINGS'] = {
    'db': 'airline_db',
    'host': 'localhost',
    'port': 27017
}

db = MongoEngine()
db.init_app(app)

#MongoEngine(app)

api.add_resource(UserRegistration, "/auth/registration")
api.add_resource(UserLogin, "/auth/login")

@app.route('/')
def hello():
    return 'Hello, World!'



