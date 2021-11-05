from mongoengine import *
from base_document import BaseDocument


class Aircraft(BaseDocument):
    meta = {
        "collection": "aircraft"
    }
    name = StringField(required=True)
    seats = DictField(required=True, fields=['first_class', 'economy', 'business_class'])




