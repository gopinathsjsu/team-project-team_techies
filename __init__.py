import os
from flask import Flask
from flask_restful import Api


app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'



