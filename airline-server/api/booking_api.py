import random
import string

from flask import request, jsonify, Blueprint,  current_app as app
from flask_jwt_extended import jwt_required, get_jwt_identity
from booking import Booking
from error_codes import ErrorCodes
from flight_api import get_flight_by_flight_id
from user_api import get_user_by_email

booking_bp = Blueprint('booking_bp', __name__)


@booking_bp.route('/booking', defaults={'b_id': None}, methods=['POST', 'GET', 'DELETE'])
@booking_bp.route('/booking/<b_id>', methods=['GET', 'DELETE'])

@jwt_required()
def booking(b_id):
    if request.method == 'POST':
        app.logger.info("Book a Flight API called")
        data = request.get_json()
        try:
            user_jwt = get_jwt_identity()
            user = get_user_by_email(user_jwt['user'])

            flight = get_flight_by_flight_id(data['flight_oid'])

            if flight is None:
                message = "No such Flight exists"
                app.logger.error(message)
                return jsonify({'message': message}), ErrorCodes.BAD_REQUEST

            if flight.remaining_seats == 0:
                message = "Flight is full"
                app.logger.error(message)
                return jsonify({'message': message}), ErrorCodes.BAD_REQUEST

            booking = Booking(booking_num="#" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=12)),
                              flight_oid=flight.id,
                              customer_oid=user.id,
                              mileage_points_earned=flight.mileage_points)
            booking.save()

            flight.remaining_seats -= 1
            flight.save()
            app.logger.info("Booking successful")
            return jsonify({'message': "Booking successful"}), ErrorCodes.SUCCESS

        except Exception as error:
            app.logger.error(f"Error message is: {error}")
            return jsonify({'message': "Something went wrong"}), ErrorCodes.INTERNAL_SERVER_ERROR

    if request.method == 'GET':
        try:
            user_jwt = get_jwt_identity()
            user = get_user_by_email(user_jwt['user'])

            if not b_id:
                res = []
                bookings = Booking.objects(customer_oid=user.id)
                for booking in bookings:
                    booking_res = jsonify(booking).json
                    booking_res['flight_details'] = f"/flight/{booking.flight_oid.id}"
                    res.append(booking_res)
                return jsonify(res), ErrorCodes.SUCCESS
            else:
                booking = get_booking_by_id(b_id)
                booking_res = jsonify(booking).json
                booking_res['flight_details'] = f"/flight/{booking.flight_oid.id}"
                return jsonify(booking_res), ErrorCodes.SUCCESS

        except Exception as error:
            app.logger.error(f"Error message is: {error}")
            return jsonify({'message': "Something went wrong"}), ErrorCodes.INTERNAL_SERVER_ERROR

    if request.method == 'DELETE':
        try:
            user_jwt = get_jwt_identity()
            user = get_user_by_email(user_jwt['user'])

            if not b_id:
                return jsonify({'message': "Booking ID required"}), ErrorCodes.BAD_REQUEST

            return jsonify(get_booking_by_id(b_id)), ErrorCodes.SUCCESS

        except Exception as error:
            print(error)
            return jsonify({'message': "Something went wrong"}), ErrorCodes.INTERNAL_SERVER_ERROR


def get_booking_by_id(b_id):
    try:
        return Booking.objects.get(id=b_id)
    except:
        return None
