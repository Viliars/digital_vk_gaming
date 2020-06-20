# Запуск backend сервера

1) `python3 -m venv venv`
2) `source venv/bin/activate`
3) `pip install -r requirements.txt`
4) `export FLASK_APP=digital.py`
5) `flask db upgrade`
6) `flask run` or `gunicorn -b localhost:9999 -w 1 digital:app`

