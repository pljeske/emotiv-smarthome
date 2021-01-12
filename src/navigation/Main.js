import React from 'react';
import Room from "./Room";
import './Main.css';

export const HASSIO_URL = 'http://192.168.178.32:1880/endpoint';

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.currentRoom = 0;
        this.rooms = props.rooms;
        this.changeRoomHandler = this.changeRoomHandler.bind(this);
        this.state = this.rooms[this.currentRoom];
        this.ws = new WebSocket('ws://127.0.0.1:1880/ws/mentalCmd');
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected to websocket');
        }

        this.ws.onclose = () => {
            console.log('disconnected from websocket');
        }
    }

    changeRoomHandler() {
        console.log("Main - changeRoomHandler")
        this.currentRoom = (this.currentRoom + 1) % this.rooms.length;
        this.setState(this.rooms[this.currentRoom]);
    }

    render(){
        return (
            <Room
                key={this.state.room.id}
                room={this.state.room}
                light={this.state.light}
                temperature={this.state.temperature}
                changeRoomHandler={this.changeRoomHandler}
                websocket={this.ws}
            />
        )
    }
}
