# User Resource
from flask import request, make_response, jsonify
from flask_restful import Resource

from user_repository import UserRepository
from util.error_codes import ErrorCodes


class UserRegistration(Resource):

    def post(self):
        request_json = request.get_json()
        try:
            UserRepository().create_user(request_json)
            message = "User - {} registered successfully".format(request_json["email"])
            code = ErrorCodes.SUCCESS
        except Exception as error:
            if int(error.__str__()) == ErrorCodes.CONFLICT:
                message = "EmailID already registered"
                code = ErrorCodes.CONFLICT
            else:
                message = "Something went wrong"
                code = ErrorCodes.INTERNAL_SERVER_ERROR
        resp = make_response(jsonify({"message": message, "code": code}))
        return resp


class UserLogin(Resource):
    def post(self):
        request_json = request.get_json()
        try:
            UserRepository().verify_user_login(request_json)
            message = "User - {} login successfully".format(request_json["email"])
            code = ErrorCodes.SUCCESS
        except Exception as error:
            print(error)
            message = "Something went wrong"
            code = ErrorCodes.INTERNAL_SERVER_ERROR

        resp = make_response(jsonify({"message": message, "code": code}))
        return resp

