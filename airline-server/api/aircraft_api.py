from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from mongoengine import NotUniqueError

from aircraft import Aircraft
from airport import Airport
from auth_util import admin_only
from util.error_codes import ErrorCodes


aircraft_bp = Blueprint('aircraft_bp', __name__)


@aircraft_bp.route('/aircraft/<id>', methods=['GET'])

# @admin_only
# @jwt_required()
def aircraft(id):
    try:
        return jsonify(Aircraft.objects(id=id)), ErrorCodes.SUCCESS
    except Exception as error:
        return jsonify({'message': "Something went wrong"}), ErrorCodes.INTERNAL_SERVER_ERROR
