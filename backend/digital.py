from app import app, db
from app.models import User, Skill, Award, Game

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Skill': Skill, 'Award': Award, 'Game': Game}