from mongoengine import *
from base_document import BaseDocument
from flight import Flight
from user import User


class Booking(BaseDocument):
    meta = {
        "collection": "booking"
    }
    booking_num = StringField(required=True)
    flight_oid = ReferenceField(Flight, required=True)
    customer_oid = ReferenceField(User, required=True)
    seat = StringField()
    mileage_points_earned = FloatField(required=True)
    booking_history = StringField(required=True, default='booked', choices=['booked', 'changed', 'canceled'])
    booked_price = IntField(required=True)
    seat_price = IntField()
    traveller_details = DictField(required=True)
    flight_status = StringField(required=True)
    payment = DictField(required=True)

# fields=['cash', 'reward_points_used']
