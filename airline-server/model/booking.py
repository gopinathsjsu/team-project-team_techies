from mongoengine import *
from base_document import BaseDocument
from flight import Flight
from user import User


class Booking(BaseDocument):
    meta = {
        "collection": "booking"
    }
    booking_id = StringField(required=True, unique=True)
    flight_id = ReferenceField(Flight, required=True)
    customer_id = ReferenceField(User, required=True)
    seat_num = StringField()
    mileage_points_earned = IntField(required=True)
