from flask import Flask
from flask_pymongo import pymongo
from __init__ import app
CONNECTION_STRING = "mongodb+srv://SaiK:Mongo01%21@clustertechies.sdi1q.mongodb.net/techiesDb?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('techiesDB')
