# User repo
from error_codes import ErrorCodes
from model.user import User
from passlib.hash import pbkdf2_sha256 as sha256


class UserRepository:

    def create_user(self, data):
        user_in_repo = self.get_user_by_email(data['email'])
        if user_in_repo:
            raise Exception(ErrorCodes.CONFLICT)
        else:
            user = User(first_name=data['first_name'],
                        last_name=data['last_name'],
                        email=data['email'],
                        password=sha256.hash(data['password']))
            user.save()

    def verify_user_login(self, data):
        user = self.get_user_by_email(data['email'])
        if user:
            # verify password
            if not sha256.verify(data["password"], user["password"]):
                raise Exception(ErrorCodes.NOT_FOUND)
        else:
            raise Exception(ErrorCodes.NOT_FOUND)

    def get_user_by_email(self, email_id):
        try:
            return User.objects.get(email=email_id)
        except:
            return None


