from mongoengine import *
from base_document import BaseDocument
from flight import Flight
from user import User


class Booking(BaseDocument):
    meta = {
        "collection": "booking"
    }
    booking_num = StringField(required=True, unique=True)
    flight_oid = ReferenceField(Flight, required=True)
    customer_oid = ReferenceField(User, required=True)
    seat = StringField(default='None', required=True)
    mileage_points_earned = IntField(required=True)
    booking_history = StringField(required=True, default='booked', choices=['booked', 'changed', 'canceled'])
