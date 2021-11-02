from flask_jwt_extended import get_jwt_identity
from mongoengine import *
import datetime


class BaseDocument(Document):
    meta = {
        'abstract': True
    }
    modified_at = DateTimeField()
    modified_by = StringField()

    def save(self, *args, **kwargs):
        self.modified_at = datetime.datetime.now()
        current_user = get_jwt_identity()
        if current_user:
            self.modified_by = current_user["user"]
        return super(BaseDocument, self).save(*args, **kwargs)


class User(BaseDocument):
    meta = {
        "collection": "user"
    }
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)
    user_type = StringField(required=True, default='customer')


class Flight(BaseDocument):
    meta = {
        "collection": "flight"
    }
    flight_id = StringField(required=True)
    aircraft = StringField(required=True)
    departure_airport = StringField(required=True)
    arrival_airport = StringField(required=True)
    departure_date = DateField(drequired=True)
    arrival_date = DateField(required=True)
    departure_time = StringField(required=True)
    arrival_time = StringField(required=True)
    price = DecimalField(required=True)
    mileage_points = IntField(required=True)