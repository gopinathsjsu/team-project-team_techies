from mongoengine import *
from base_document import BaseDocument


class Aircraft(BaseDocument):
    meta = {
        "collection": "aircraft"
    }
    name = StringField(required=True)
    total_seats = IntField(required=True)
    seats = DictField(required=True, fields=['window', 'aisle', 'middle'])




