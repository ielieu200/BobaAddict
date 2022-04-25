from datetime import datetime

import json

from werkzeug.security import generate_password_hash, check_password_hash

from .database import Database

# user_schema = {
#     "username": {
#         "type": 'string',
#         'minlength': 1,
#         'required': True,
#     },
#     "email": {
#         "type": 'string',
#         "minlength": 6,
#         "required": True,
#     },
#     "password": {
#         "type": 'string',
#         "minlength": 6,
#         "required": True,
#     },
#     "join_date": {
#         "type": datetime,
#         "required": True,
#     }
# }
# try: 
#     db.create_collection(COLLECTION_NAME, user_schema)

# collection = db[COLLECTION_NAME]


class Users():
    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password

    def __repr__(self):
        return f"User {self.username}"

    def create_new_user(self):
        result_id = Database.insert("users", self.toJSON())
        return result_id

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # @classmethod
    # def get_by_id(cls, id):
    #     return cls.query.get_or_404(id)

    @classmethod
    def get_user(cls, email):
        res = Database.find("users", {"email": email})
        list_res = list(res) # list of users with email given
        if len(list_res) > 0:
            user_info = list_res[0]
            return Users(user_info['email'], user_info['username'], user_info['password'])
        return False

    def toDICT(self):

        cls_dict = {}
        cls_dict['username'] = self.username
        cls_dict['password'] = generate_password_hash(self.password)
        cls_dict['email'] = self.email
        # cls_dict['date_joined'] = datetime.now()

        return cls_dict

    def toJSON(self):

        return self.toDICT()


# class JWTTokenBlocklist(db.Model):
#     id = db.Column(db.Integer(), primary_key=True)
#     jwt_token = db.Column(db.String(), nullable=False)
#     created_at = db.Column(db.DateTime(), nullable=False)

#     def __repr__(self):
#         return f"Expired Token: {self.jwt_token}"

#     def save(self):
#         db.session.add(self)
#         db.session.commit()