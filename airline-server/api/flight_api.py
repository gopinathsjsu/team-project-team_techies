from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from mongoengine import NotUniqueError

from aircraft import Aircraft
from aircraft_api import get_aircraft_details
from airport_api import get_airport_by_id
from auth_util import admin_only
from flight import Flight
from util.error_codes import ErrorCodes


flight_bp = Blueprint('flight_bp', __name__)


@flight_bp.route('/flight', methods=['POST', 'GET'])

def flight():
    if request.method == 'POST':
        return add_flight()
    else:
        return get_all_flights()

@admin_only
@jwt_required()
def add_flight():
    data = request.get_json()
    try:
        aircraft = get_aircraft_details(data['aircraft'])
        flight = Flight(flight_id="AA" + data['flight_id'],
                        aircraft=data['aircraft'],
                        departure_airport=data['departure_airport'],
                        arrival_airport=data['arrival_airport'],
                        departure_date=data['departure_date'],
                        arrival_date=data['arrival_date'],
                        departure_time=data['departure_time'],
                        arrival_time=data['arrival_time'],
                        price=data['price'],
                        mileage_points=data['mileage_points'],
                        remaining_seats=aircraft.total_seats,
                        seats=aircraft.seats
                        )
        flight.save()

        message = "Flight - {} added successfully".format(data["flight_id"])
        code = ErrorCodes.SUCCESS

    except NotUniqueError:
        message = "Flight ID already registered"
        code = ErrorCodes.CONFLICT

    except Exception as error:
        print(error)
        message = "Something went wrong"
        code = ErrorCodes.INTERNAL_SERVER_ERROR

    return jsonify(message), code

def get_all_flights():
    airport1 = request.args.get('airport1')
    airport2 = request.args.get('airport2')
    depart_date = request.args.get('depart_date')
    # return_date = request.args.get('return_date')

    try:
        print(airport1, airport2, depart_date)
        res = []
        # add filter -- > only if seats rem > 0, return flight
        flights = Flight.objects(departure_date=depart_date,
                                 departure_airport=airport1,
                                 arrival_airport=airport2)

        for flight in flights:
            flight_res = jsonify(flight).json
            flight_res['aircraft'] = f"/aircraft/{flight.aircraft.id}"
            flight_res['departure_airport'] = f"/airport/{flight.departure_airport.id}"
            flight_res['arrival_airport'] = f"/airport/{flight.arrival_airport.id}"
            res.append(flight_res)

        code = ErrorCodes.SUCCESS

    except Exception as error:
        print(error)
        res = "Something went wrong"
        code = ErrorCodes.INTERNAL_SERVER_ERROR
    return jsonify(res), code


def get_flight_by_flight_id(id):
    try:
        return Flight.objects.get(id=id)
    except:
        return None


