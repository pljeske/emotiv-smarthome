import axios from "axios";

export class SmartHomeHub {
    constructor(rooms, baseUrl, bearerToken) {
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
        }
        this.baseUrl = baseUrl;
        this.rooms = {};
        this.roomNames = [];
        this.currentRoomNr = 0;
        this.activeRoom = rooms[this.currentRoomNr].name;
        rooms.forEach(roomConfig => {
            this.rooms[roomConfig.name] = {lightId: roomConfig.lightId, temperatureId: roomConfig.temperatureId};
            this.roomNames.push(roomConfig.name);
        });
    }

    changeActiveRoom(roomName) {
        if (roomName in this.rooms) {
            this.activeRoom = roomName;
        } else {
            throw new NoRoomExistsException('Room with name ' + roomName + ' is not found in config.');
        }
    }
    switchRoom() {
        this.currentRoomNr = (this.currentRoomNr + 1) % this.roomNames.length;
        this.changeActiveRoom(this.roomNames[this.currentRoomNr]);
    }

    switchLight() {
        let url = this.baseUrl + '/api/services/light/toggle';
        let entityId = this.rooms[this.activeRoom].lightId;
        let payload = {"entity_id": entityId}
        return axios.post(url, payload, this.headers);
    }

    getLightStatus() {
        let url = this.baseUrl + '/api/states/' + this.rooms[this.activeRoom].lightId;
        return axios.get(url, this.headers);
    }

    getTemperatureStatus() {
        let url = this.baseUrl + '/api/states/' + this.rooms[this.activeRoom].temperatureId;
        return axios.get(url, this.headers);
    }

    setTemperature(temperature) {
        let url = this.baseUrl + '/api/services/climate/set_temperature'
        let entityId = this.rooms[this.activeRoom].temperatureId;
        let payload = {"entity_id": entityId, "temperature": temperature};
        return axios.post(url, payload, this.headers);
    }
}

function NoRoomExistsException(message) {
    this.message = message;
    this.name = 'NoRoomExistsException';
}

let rooms = [
    {
        name: 'Kitchen',
        lightId: 'light.schreibtisch',
        temperatureId: 'climate.comet_dect_1'
    },
    {
        name: 'Living',
        lightId: 'light.deckenlampe',
        temperatureId: 'climate.comet_dect_1'
    }
]
let bearer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyODliMWRlOTMwYzc0MjFjOTNhYjE5OWZhNmNjYTNhOCIsImlhdCI6MTYwODEwNTg2MiwiZXhwIjoxOTIzNDY1ODYyfQ.9iKSwpsV-mFMisg1mx-KQa5t_VuLpUVBM4cROkYOqoM';
const smarthome = new SmartHomeHub(rooms, 'http://192.168.178.32:8123', bearer);

smarthome.getLightStatus().then(res => console.log(res));
