from flask import Flask, request, g, jsonify
import sqlite3
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
DATABASE = 'rooms.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        cur = db.cursor()
        cur.execute('CREATE TABLE IF NOT EXISTS rooms(id integer PRIMARY KEY, name text, light text, temperature text)')
    return db


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def add_room_to_db(room_name: str, light: str, temperature: str):
    cur = get_db().cursor()
    light = light.replace("/", "+")
    temperature = temperature.replace("/", "+")
    values = (room_name, light, temperature)
    query = 'INSERT INTO rooms VALUES(NULL, ?, ?, ?)'
    cur.execute(query, values)
    get_db().commit()


def get_rooms_from_db():
    response = query_db("SELECT * FROM rooms")
    rooms = []
    for room in response:
        rooms.append({
            "id": room[0],
            "room": room[1],
            "light": {
                "endpoint": room[2].replace("+", "/")
            },
            "temperature": {
                "endpoint": room[3].replace("+", "/")
            }
        })
    return rooms


def delete_all_rooms():
    cur = get_db().cursor()
    query = 'DELETE FROM rooms'
    cur.execute(query)
    get_db().commit()


def delete_room(room_id: int):
    query_db(f'DELETE FROM rooms WHERE id = {room_id}')
    get_db().commit()


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@cross_origin()
@app.route('/rooms/', methods=['POST', 'GET', 'DELETE'])
def rooms():
    if request.method == 'DELETE':
        delete_all_rooms()

    if request.method == 'POST':
        room = {
            'name': request.json['name'],
            'light': request.json['lightEndpoint'],
            'temperature': request.json['temperatureEndpoint']
        }
        add_room_to_db(room['name'], room['light'], room['temperature'])
    response = jsonify(get_rooms_from_db())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@cross_origin()
@app.route('/rooms/<roomId>', methods=['DELETE'])
def delete_room_endpoint(roomId):
    delete_room(roomId)
    response = jsonify(get_rooms_from_db())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@cross_origin()
@app.route("/test", methods=['GET'])
def test():
    response = jsonify(get_rooms_from_db())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    app.run()
