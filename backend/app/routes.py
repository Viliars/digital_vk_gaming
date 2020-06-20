from app import app, db
from app.models import User
from flask import request, jsonify

@app.route('/')
def root():
    return "OK"

@app.route('/add_user', methods=['POST'])
def add_user():
    id = request.args.get('id', 1, type=int)
    username = request.args.get('username', 1, type=str)
    user = User(id=id, username=username)
    db.session.add(user)
    db.session.commit()
    return "OK"

@app.route('/get_user', methods=['GET'])
def get_user():
    id = request.args.get('id', 1, type=int)
    user = User.query.filter_by(id=id).first()
    if user is not None:
        return f"User - {user.username}"
    else:
        return "ERROR"
