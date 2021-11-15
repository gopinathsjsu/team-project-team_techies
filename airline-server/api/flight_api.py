from flask import request, jsonify, Blueprint, current_app as app
from flask_jwt_extended import jwt_required
from mongoengine import NotUniqueError

from aircraft_api import get_aircraft_details
from auth_util import admin_only
from flight import Flight
from util.error_codes import ErrorCodes


flight_bp = Blueprint('flight_bp', __name__)


@flight_bp.route('/flight', defaults={'id': None}, methods=['POST', 'GET'])
@flight_bp.route('/flight/<id>', methods=['GET'])


def flight(id):
    if request.method == 'POST':
        app.logger.info(f"Add flight API called")
        return add_flight()
    else:
        return get_all_flights(id)

# @admin_only
# @jwt_required()
def add_flight():
    data = request.get_json()
    try:
        aircraft = get_aircraft_details(data['aircraft'])
        mileage_points = data['price'] / 10

        flight_num = "AA" + data['flight_num']

        flight = Flight(flight_num=flight_num,
                        aircraft=data['aircraft'],
                        departure_airport=data['departure_airport'],
                        arrival_airport=data['arrival_airport'],
                        departure_date=data['departure_date'],
                        arrival_date=data['arrival_date'],
                        departure_time=data['departure_time'],
                        arrival_time=data['arrival_time'],
                        price=data['price'],
                        mileage_points=mileage_points,
                        remaining_seats=aircraft.total_seats,
                        seats=aircraft.seats
                        )

        flight.save()

        message = "Flight - {} added successfully".format(data["flight_num"])
        app.logger.info(message)
        code = ErrorCodes.SUCCESS

    except NotUniqueError:
        message = "Flight Number already registered"
        app.logger.error(f"Error message is {message}")
        code = ErrorCodes.CONFLICT

    except Exception as error:
        app.logger.error(f"Error message is: {error}")
        message = "Something went wrong"
        code = ErrorCodes.INTERNAL_SERVER_ERROR

    return jsonify(message), code


def get_all_flights(id):
    if not id:
        app.logger.info(f"Get flights API called")
        airport1 = request.args.get('airport1')
        airport2 = request.args.get('airport2')
        depart_date = request.args.get('depart_date')
        # return_date = request.args.get('return_date')

        if airport1 is None or airport2 is None or depart_date is None:
            return jsonify({'message': "Required parameters missing"}), ErrorCodes.BAD_REQUEST

        try:
            res = []
            flights = Flight.objects(departure_date=depart_date,
                                     departure_airport=airport1,
                                     arrival_airport=airport2,
                                     remaining_seats__gte=1)

            for flight in flights:
                flight_res = jsonify(flight).json
                flight_res['aircraft'] = f"/aircraft/{flight.aircraft.id}"
                flight_res['departure_airport'] = f"/airport/{flight.departure_airport.id}"
                flight_res['arrival_airport'] = f"/airport/{flight.arrival_airport.id}"
                res.append(flight_res)

            code = ErrorCodes.SUCCESS

        except Exception as error:
            app.logger.error(f"Error message is: {error}")
            res = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR
        return jsonify(res), code

    else:
        app.logger.info("Get flight_by_ID API called")
        flight = get_flight_by_flight_id(id)
        flight_res = jsonify(flight).json
        flight_res['aircraft'] = f"/aircraft/{flight.aircraft.id}"
        flight_res['departure_airport'] = f"/airport/{flight.departure_airport.id}"
        flight_res['arrival_airport'] = f"/airport/{flight.arrival_airport.id}"
        return jsonify(flight_res), ErrorCodes.SUCCESS


def get_flight_by_flight_id(id):
    try:
        return Flight.objects.get(id=id)
    except:
        return None


