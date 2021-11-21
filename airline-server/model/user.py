from mongoengine import *
from base_document import BaseDocument


class User(BaseDocument):
    meta = {
        "collection": "user"
    }
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    user_type = StringField(required=True, default='customer', choices=['customer', 'admin'])
    mileage_points = FloatField(required=True, default=10)
