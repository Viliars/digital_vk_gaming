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
        data = {
            "id": id,
            "nickname": "Zortan3301",
            "description": "Dead by daylight",
            "links": {
                "steam": "zortan3301",
                "discord": None,
                "twitch": "zortan3301"
            },
            "skills": [
                {
                    "title": "coordinator",
                    "count": 3,
                },
                {
                    "title": "leader",
                    "count": 2,
                }
            ],
            "awards": [
                {
                    "title": "Ez Game",
                    "imgSrc": "https://www.ezride.be/wp-content/uploads/2017/11/cropped-Logo_EZRide_yellow_circle.png"
                }
            ]
        }

    return jsonify(data)