from random import randint
from nickname_generator import generate
from app.models import User, Skill, Game, Award
from app import db

def add_random_user(id):
    user = User(id=id, nickname=generate(), description="Team Devian", steam=generate(),
                discord=generate(), twitch=generate())

    s1 = Skill(title="Координатор", count=3, user=user)
    s2 = Skill(title="Лидер", count=2, user=user)

    g1 = Game(game_id=randint(0, 9), user=user)

    a1 = Award(title="Ez Game", imgSrc="https://www.ezride.be/wp-content/uploads/2017/11/cropped-Logo_EZRide_yellow_circle.png", user=user)

    db.session.add(user)
    db.session.add(s1)
    db.session.add(s2)
    db.session.add(g1)
    db.session.add(a1)

    db.session.commit()

    return user