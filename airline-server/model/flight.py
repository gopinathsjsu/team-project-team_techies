from mongoengine import *

from aircraft import Aircraft
from airport import Airport
from base_document import BaseDocument


class Flight(BaseDocument):
    meta = {
        "collection": "flight"
    }
    flight_num = StringField(required=True, unique=True)
    aircraft = ReferenceField(Aircraft, required=True)
    departure_airport = ReferenceField(Airport, required=True)
    arrival_airport = ReferenceField(Airport, required=True)
    departure_date = DateField(drequired=True)
    arrival_date = DateField(required=True)
    departure_time = StringField(required=True)
    arrival_time = StringField(required=True)
    price = DecimalField(required=True)
    mileage_points = IntField(required=True)
    remaining_seats = IntField(required=True)
    seats = DictField(required=True, fields=['window', 'aisle', 'middle'])
    flight_status = StringField(required=True, default='scheduled', choices=['scheduled', 'canceled'])
