from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from mongoengine import NotUniqueError

from airport import Airport
from auth_util import admin_only
from util.error_codes import ErrorCodes


airport_bp = Blueprint('airport_bp', __name__)


@airport_bp.route('/airport', defaults={'id': None}, methods=['POST', 'GET'])
@airport_bp.route('/airport/<id>', methods=['GET'])

# @admin_only
# @jwt_required()
def airport(id):
    print(id)
    if request.method == 'POST':
        data = request.get_json()
        try:
            airport = Airport(code=data['code'],
                              name=data['name'],
                              city=data['city'])
            airport.save()

            message = "Airport - {} added successfully".format(data["code"])
            code = ErrorCodes.SUCCESS

        except NotUniqueError:
            message = "Airport Code already registered"
            code = ErrorCodes.CONFLICT

        except Exception as error:
            print(error)
            message = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR

        return jsonify(message), code

    if request.method == 'GET':
        try:
            if not id:
                return jsonify(Airport.objects()), ErrorCodes.SUCCESS
            else:
                return jsonify(Airport.objects(id=id)), ErrorCodes.SUCCESS

        except Exception as error:
            print(error)
            return jsonify({'message': "Something went wrong"}), ErrorCodes.INTERNAL_SERVER_ERROR


def get_airport_by_id(id):
    print(id)
    try:
        return Airport.objects.get(id=id)
    except:
        return None