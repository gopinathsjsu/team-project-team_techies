from mongoengine import *
import datetime


class BaseDocument(Document):
    meta = {
        'abstract': True
    }
    modified_at = DateTimeField()
    created_at = DateTimeField()

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.datetime.now()
        self.modified_at = datetime.datetime.now()
        return super(BaseDocument, self).save(*args, **kwargs)


class User(BaseDocument):
    meta = {
        "collection": "user"
    }
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)
    is_admin = BooleanField(required=True, default=False)


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