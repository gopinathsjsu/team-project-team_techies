from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required

from auth_util import admin_only
from models import Flight
from util.error_codes import ErrorCodes


flight_bp = Blueprint('flight_bp', __name__)


@flight_bp.route('/flight', methods=['POST', 'GET'])
@admin_only
@jwt_required()
def flight():
    if request.method == 'POST':
        data = request.get_json()
        try:
            flight_in_repo = get_flight_by_flight_id(data['flight_id'])
            if flight_in_repo:
                message = "Flight ID already registered"
                code = ErrorCodes.CONFLICT
            else:
                flight = Flight(flight_id=data['flight_id'],
                                aircraft=data['aircraft'],
                                departure_airport=data['departure_airport'],
                                arrival_airport=data['arrival_airport'],
                                departure_date=data['departure_date'],
                                arrival_date=data['arrival_date'],
                                departure_time=data['departure_time'],
                                arrival_time=data['arrival_time'],
                                price=data['price'],
                                mileage_points=data['mileage_points'])
                flight.save()

                message = "Flight - {} added successfully".format(data["flight_id"])
                code = ErrorCodes.SUCCESS

        except Exception as error:
            print(error)
            message = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR

        return jsonify(message), code

    if request.method == 'GET':
        airport1 = request.args.get('airport1')
        airport2 = request.args.get('airport2')
        depart_date = request.args.get('depart_date')
        return_date = request.args.get('return_date')

        try:
            flights = {}
            print(airport1, airport2, depart_date)

            if depart_date and return_date:
                flights['departing_flights'] = Flight.objects(departure_date=depart_date,
                                                              departure_airport=airport1.upper(),
                                                              arrival_airport=airport2.upper()
                                                              )

                flights['returning_flights'] = Flight.objects(departure_date=return_date,
                                                              departure_airport=airport2.upper(),
                                                              arrival_airport=airport1.upper()
                                                              )
            else:
                flights['departing_flights'] = Flight.objects(departure_date=depart_date,
                                                              departure_airport=airport1.upper(),
                                                              arrival_airport=airport2.upper()
                                                              )
                for item in flights['departing_flights']:
                    print(type(item.departure_date))
            code = ErrorCodes.SUCCESS

        except Exception as error:
            print(error)
            flights = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR
        return jsonify(flights), code


def get_flight_by_flight_id(flightID):
    print(flightID)
    try:
        return Flight.objects.get(flight_id=flightID)
    except:
        return None


