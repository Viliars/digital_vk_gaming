from app import app, db
from app.models import User, Game
from flask import request, jsonify
from app.utils import add_random_user


@app.route('/')
def root():
    return "OK"

@app.route('/add_favorites', methods=['GET'])
def add_favorites():
    user_id = request.args.get('user_id', 1, type=int)
    game_id = request.args.get('game_id', 1, type=int)
    user = User.query.filter_by(id=user_id).first()
    game = Game(game_id=game_id, user=user)
    db.session.add(game)
    db.session.commit()
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
    user = User.query.filter_by(id=id).first()

    if user is None:
        user = add_random_user(id)

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
            "awards": [],
            "games": []
        }

    for skill in user.skills:
        data["skills"].append({"title": skill.title, "count": skill.count})

    for award in user.awards:
        data["awards"].append({"title": award.title, "imgSrc": award.imgSrc})

    for game in user.games:
        data["games"].append(game.game_id)

    return jsonify(data)