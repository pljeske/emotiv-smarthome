import React from 'react';
import Room from "./Room";
import './Main.css';
import {config} from '../config/config';
import {roomConfig} from "../config/roomConfig";

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.currentRoom = 0;
        this.changeRoomHandler = this.changeRoomHandler.bind(this);
        this.state = roomConfig[this.currentRoom];
        this.ws = new WebSocket(config.websocketUrl);
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected to websocket');
        }
        this.ws.onmessage = evt => {
            try {
                const message = JSON.parse(evt.data);
                console.log(message);
            } catch (exception) {
                console.log(evt.data)
            }

        }
        this.ws.onclose = () => {
            console.log('disconnected from websocket');
        }
    }

    changeRoomHandler() {
        console.log("Main - changeRoomHandler")
        this.currentRoom = (this.currentRoom + 1) % roomConfig.length;
        this.setState(roomConfig[this.currentRoom]);
    }

    render(){
        return (
            <Room room={this.state.room}
                  light={this.state.light}
                  temperature={this.state.temperature}
                  changeRoomHandler={this.changeRoomHandler}
                  websocket={this.ws}
            />
        )
    }
}
