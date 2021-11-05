from mongoengine import *
from base_document import BaseDocument
from flight import Flight
from user import User


class Booking(BaseDocument):
    meta = {
        "collection": "booking"
    }
    flight_id = ReferenceField(Flight, required=True)
    customer_id = ReferenceField(User, required=True)
    seat_num = StringField(required=True)
    mileage_points_earned = IntField(required=True)
