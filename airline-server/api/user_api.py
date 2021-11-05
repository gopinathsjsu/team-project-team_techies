from datetime import timedelta

from flask import request, jsonify, Blueprint, make_response
from mongoengine import NotUniqueError
from passlib.hash import pbkdf2_sha256 as sha256
from flask_jwt_extended import create_access_token

from user import User
from util.error_codes import ErrorCodes

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/user-registration', methods=['POST'])
def create_user():
    if request.method == 'POST':
        data = request.get_json()
        try:
            user = User(first_name=data['first_name'],
                        last_name=data['last_name'],
                        email=data['email'],
                        password=sha256.hash(data['password']))
            user.save()
            message = "User - {} registered successfully".format(data["email"])
            code = ErrorCodes.SUCCESS

        except NotUniqueError:
            message = "EmailID already registered"
            code = ErrorCodes.CONFLICT

        except Exception as error:
            print(error)
            message = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR

        return jsonify(message), code


@user_bp.route('/user-login', methods=['POST'])
def user_login():
    if request.method == 'POST':
        data = request.get_json()
        try:
            user = get_user_by_email(data['email'])
            if user:
                # verify password
                if not sha256.verify(data["password"], user["password"]):
                    return jsonify({'message': "Please verify email/password"}), ErrorCodes.NOT_FOUND
                else:
                    user_fmt = {'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email}
                    token = create_access_token(identity={'user':  user.email, 'user_type': user.user_type},
                                                expires_delta=timedelta(minutes=60))
                    resp = make_response(jsonify({"user": user_fmt, "message": "User - {} login successfully".format(data["email"])}), ErrorCodes.SUCCESS)
                    resp.headers.extend({'Access-Control-Expose-Headers': 'Authorization', 'Authorization': 'Bearer {}'.format(token)})
                    return resp

            else:
                return jsonify({'message': "Please verify email/password"}), ErrorCodes.NOT_FOUND

        except Exception as error:
            print(error)
            return jsonify({'message': "Something went wrong"}), ErrorCodes.INTERNAL_SERVER_ERROR


def get_user_by_email(email_id):
    try:
        return User.objects.get(email=email_id)
    except:
        return None

