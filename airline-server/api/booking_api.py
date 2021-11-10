from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from auth_util import admin_only
from booking import Booking
from error_codes import ErrorCodes
from flight_api import get_flight_by_flight_id
from user_api import get_user_by_email

booking_bp = Blueprint('booking_bp', __name__)


@booking_bp.route('/booking', methods=['POST', 'GET'])
@jwt_required()
def booking():
    if request.method == 'POST':
        data = request.get_json()
        try:
            user_jwt = get_jwt_identity()
            user = get_user_by_email(user_jwt['user'])
            flight = get_flight_by_flight_id(data['flight_id'])
            print(user.id, flight.id)
            if flight is None or flight.remaining_seats < 1:
                raise Exception

            booking = Booking(booking_id="#" + str(user.id)[:4] + str(flight.id)[:4],
                              flight_id=flight.id,
                              customer_id=user.id,
                              mileage_points_earned=flight.mileage_points)
            booking.save()

            flight.remaining_seats -= 1
            flight.save()

            message = "Booking successful"
            code = ErrorCodes.SUCCESS

        except Exception as error:
            print(error)
            message = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR

        return jsonify(message), code

    if request.method == 'GET':
        try:
            user_jwt = get_jwt_identity()
            user = get_user_by_email(user_jwt['user'])

            booking = Booking.objects(customer_id=user.id)
            code = ErrorCodes.SUCCESS

        except Exception as error:
            print(error)
            booking = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR

        return jsonify(booking), code