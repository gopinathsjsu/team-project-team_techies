# User class
from mongoengine import *

from basedocument import BaseDocument


class User(BaseDocument):
    meta = {
        "collection": "user"
    }
    first_name = StringField(required=True, min_length=3, max_length=35)
    last_name = StringField(required=True, min_length=3, max_length=35)
    email = StringField(required=True)
    password = StringField(required=True)
    is_admin = BooleanField(required=True, default=False)


