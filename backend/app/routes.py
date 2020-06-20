from app import app, db
from app.models import User
from flask import request, jsonify
from app.utils import get_random_data


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

@app.route('/get_user/<id>', methods=['GET'])
def get_user(id):
    id = int(id)
    user = User.query.filter_by(id=id).first()

    if user is not None:
        data = {
            "id": user.id,
            "nickname": user.nickname,
            "description": user.description,
            "links": {
                "steam": user.steam,
                "discord": user.discord,
                "twitch": user.twitch
            },
            "skills": [],
            "awards": []
        }

        for skill in user.skills:
            data["skills"].append({"title": skill.title, "count": skill.count})

        for award in user.awards:
            data["awards"].append({"title": award.title, "imgSrc": award.imgSrc})
    else:
        data = get_random_data(id)

    return jsonify(data)