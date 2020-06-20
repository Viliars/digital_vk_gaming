from app import db


class User(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    nickname = db.Column(db.String(32))
    description = db.Column(db.String(128))
    steam = db.Column(db.String(32))
    discord = db.Column(db.String(32))
    twitch = db.Column(db.String(32))
    skills = db.relationship('Skill', backref='user')
    awards = db.relationship('Award', backref='user')
    games = db.relationship('Game', backref='user')

    def __repr__(self):
        return '<User {}>'.format(self.nickname)


class Game(db.Model):
    game_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    count = db.Column(db.Integer)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Skill {}>'.format(self.title)


class Award(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    imgSrc = db.Column(db.String(32))
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Award {}>'.format(self.title)