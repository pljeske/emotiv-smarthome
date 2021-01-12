import React from "react";
import AddRoomForm from './AddRoomForm';
import axios from 'axios';
import RoomElement from "./RoomElement";
import {Button} from "react-bootstrap";
import HowTo from "./HowTo";

const CONFIG_SERVER_URL = 'http://localhost:5000';

export default class AssistanceSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: null,
            show: "howto",
            showNewRoomForm: false
        }
    }

    componentDidMount() {
        this.updateRoomsFromServer();
    }

    updateRoomsFromServer = () => {
        let that = this;
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }
        axios.get(CONFIG_SERVER_URL + '/rooms/', config)
            .then(function (response) {
                that.setState({
                    rooms: response.data,
                    showNewRoomForm: that.state.showNewRoomForm
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    switchShowNewRoomForm = () => {
        this.setState({
            rooms: this.state.rooms,
            showNewRoomForm: !this.state.showNewRoomForm
        });
    }

    showHowTo = () => {
        this.setState({
            rooms: this.state.rooms,
            show: "howto"
        });
    }

    showNewRoomForm = () => {
        this.setState({
            rooms: this.state.rooms,
            show: "newroom"
        })
    }

    showRoomConfig = () => {
        this.setState({
            rooms: this.state.rooms,
            show: "config"
        })
    }

    deleteRoom = (roomId) => {
        let that = this;
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }
        axios.delete(CONFIG_SERVER_URL + "/rooms/" + roomId, config)
            .then(function(response) {
                that.setState({
                    rooms: response.data,
                    showNewRoomForm: that.state.showNewRoomForm
                });
            }).catch(function (error) {
                console.log(error);
            });
    }

    render(){
        let fields = [];
        if (this.state.show === "config") {
            for (let i in this.state.rooms) {
                let room = this.state.rooms[i];
                fields.push(<RoomElement key={room.id} id={room.id} name={room.room} lightEndpoint={room.light.endpoint}
                                         temperatureEndpoint={room.temperature.endpoint} deleteRoom={this.deleteRoom} />)
            }
            fields.push(<Button variant="secondary" onClick={this.showHowTo}>How To</Button>);
            fields.push(<Button variant="primary" onClick={this.showNewRoomForm}>New Room</Button>)
        } else if (this.state.show === "newroom"){
            fields.push(<AddRoomForm handleButton={this.showRoomConfig} updateRooms={this.updateRoomsFromServer}/>)
        } else {
            fields.push(<HowTo gotoRoomConfig={this.showRoomConfig} />);
        }

        // fields.push(<RoomElement key={999} name={null} lightEndpoint={null} temperatureEndpoint={null} />)
        return <div>
            {fields}
            {/*<AddRoomForm />*/}
        </div>
    }
}
