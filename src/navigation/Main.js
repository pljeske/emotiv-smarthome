import React from 'react';
import Room from "./Room";
import './Main.css';
import {Link} from "react-router-dom";
import {EMOTIV_WEBSOCKET} from "../App";

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.currentRoom = 0;
        this.rooms = props.rooms;
        this.changeRoomHandler = this.changeRoomHandler.bind(this);
        this.state = this.rooms[this.currentRoom];
        this.ws = new WebSocket(EMOTIV_WEBSOCKET);
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
        this.currentRoom = (this.currentRoom + 1) % this.rooms.length;
        this.setState(this.rooms[this.currentRoom]);
    }

    render(){
        if (this.state != null && this.rooms.length > 0) {
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
        } else {
            return (
                <div>
                    <p>No rooms configured yet. Please go to <Link to="/assistance">assistance page</Link> for setup</p>
                </div>
            )
        }

    }
}
