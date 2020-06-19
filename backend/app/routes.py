from backend.app import app

@app.route('/')
def root():
    return "OK"

