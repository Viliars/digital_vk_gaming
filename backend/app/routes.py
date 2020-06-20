from app import app
# from app.models import User
from flask import request, jsonify
from app.utils import get_random_data


@app.route('/')
def root():
    return "OK"

# @app.route('/add_user', methods=['POST'])
# def add_user():
#     id = request.args.get('id', 1, type=int)
#     username = request.args.get('username', 1, type=str)
#     #user = User(id=id, username=username)
#     # db.session.add(user)
#     # db.session.commit()
#     return "OK"

@app.route('/get_user/<id>', methods=['GET'])
def get_user(id):
    id = int(id)

    data = get_random_data(id)

    return jsonify(data)