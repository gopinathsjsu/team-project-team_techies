from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity


from booking_api import get_booking_by_id
from error_codes import ErrorCodes
from flight_api import get_flight_by_flight_id
from user_api import get_user_by_email

seat_bp = Blueprint('seat_bp', __name__)


@seat_bp.route('/booking/purchase_seat', methods=['POST'])


@jwt_required()
def purchase_seat():
    if request.method == 'POST':
        data = request.get_json()
        try:
            user_jwt = get_jwt_identity()
            user = get_user_by_email(user_jwt['user'])
            booking = get_booking_by_id(user.id, data['booking_id'])
            seat = data['seat']
            flight = get_flight_by_flight_id(booking.flight_id)
            if booking.seat is not None:
                return jsonify({'message': "You have already booked a seat for this flight!!"}), ErrorCodes.BAD_REQUEST
            else:
                if booking.flight_id.seats[seat] == 0:
                    return jsonify(
                        {'message': f"All {seat} seats are taken"}), ErrorCodes.BAD_REQUEST

                booking.seat = seat
                flight.seats[seat] -= 1
                booking.save()
                flight.save()

                return jsonify({'booking': booking, 'message': "Seat Purchase successful!"}), ErrorCodes.SUCCESS

        except Exception as error:
            print(error)
            return jsonify({'message': "Something went wrong"}), ErrorCodes.INTERNAL_SERVER_ERROR

