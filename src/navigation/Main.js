import React from 'react';
import Room from "./Room";
import './Main.css';

export const ROOMS = [
    {
        room: "Bedroom",
        light: {
            endpoint: "/bedroom/light"
        },
        temperature: {
            endpoint: "/bedroom/temperature"
        }
    }
    , {
        room: "Living Room",
        light: {
            endpoint: "/living/light"
        },
        temperature: {
            endpoint: "/living/temperature"
        }
    },
    {
        room: "Kitchen",
        roomState: "outside",
        light: {
            endpoint: "/kitchen/light"
        },
        temperature: {
            endpoint: "/kitchen/temperature"
        }
    }
]

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.currentRoom = 0;
        this.changeRoomHandler = this.changeRoomHandler.bind(this);
        this.state = ROOMS[this.currentRoom];
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
        this.currentRoom = (this.currentRoom + 1) % ROOMS.length;
        this.setState(ROOMS[this.currentRoom]);
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
