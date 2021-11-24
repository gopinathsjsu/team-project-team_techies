from flask import request, jsonify, Blueprint,  current_app as app
from flask_jwt_extended import jwt_required, get_jwt_identity


from api.booking_api import get_booking_by_id
from util.error_codes import ErrorCodes

seat_bp = Blueprint('seat_bp', __name__)


@seat_bp.route('/booking/purchase_seat', methods=['POST'])


@jwt_required()
def purchase_seat():
    if request.method == 'POST':
        data = request.get_json()
        try:
            booking = get_booking_by_id(data['booking_id'])
            seat = data['seat']

            if booking.seat not in ['window', 'aisle', 'middle']:
                if booking.flight_oid.seats[seat] == 0:
                    return jsonify(
                        {'message': f"All {seat} seats are taken"}), ErrorCodes.BAD_REQUEST

                booking.seat = seat
                booking.seat_price = booking.flight_oid.seat_price[seat]
                booking.save()

                booking.flight_oid.seats[seat] -= 1
                booking.flight_oid.save()

                return jsonify({'booking': booking, 'message': "Seat Purchase successful!"}), ErrorCodes.SUCCESS
            else:
                return jsonify({'message': "You have already booked a seat for this flight!!"}), ErrorCodes.BAD_REQUEST

        except Exception as error:
            app.logger.error(f"Error message is {error}")
            return jsonify({'message': "Something went wrong"}), ErrorCodes.INTERNAL_SERVER_ERROR

