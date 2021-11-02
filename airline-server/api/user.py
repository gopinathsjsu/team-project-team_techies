from flask import request, jsonify, Blueprint
from passlib.hash import pbkdf2_sha256 as sha256

from models import User
from util.error_codes import ErrorCodes

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/user-registration', methods=['POST'])
def create_user():
    if request.method == 'POST':
        data = request.get_json()
        try:
            user_in_repo = get_user_by_email(data['email'])
            if user_in_repo:
                message = "EmailID already registered"
                code = ErrorCodes.CONFLICT
            else:
                user = User(first_name=data['first_name'],
                            last_name=data['last_name'],
                            email=data['email'],
                            password=sha256.hash(data['password']))
                user.save()
                message = "User - {} registered successfully".format(data["email"])
                code = ErrorCodes.SUCCESS
        except Exception as error:
            print(error)
            message = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR

        return jsonify(message), code


@user_bp.route('/user-login', methods=['POST'])
def user_login():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        try:
            user = get_user_by_email(data['email'])
            if user:
                # verify password
                if not sha256.verify(data["password"], user["password"]):
                    message = "Please verify email/password"
                    code = ErrorCodes.NOT_FOUND
                else:
                    message = "User - {} login successfully".format(data["email"])
                    code = ErrorCodes.SUCCESS
            else:
                message = "Please verify email/password"
                code = ErrorCodes.NOT_FOUND

        except Exception as error:
            message = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR

        return jsonify(message), code


def get_user_by_email(email_id):
    try:
        return User.objects.get(email=email_id)
    except:
        return None

