import React from "react";
import AddRoomForm from './AddRoomForm';
import axios from 'axios';
import HowTo from "./HowTo";
import RoomConfig from "./RoomConfig";

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
        if (this.state.show === "config") {
            return <RoomConfig rooms={this.state.rooms} deleteRoom={this.deleteRoom} showHowTo={this.showHowTo}
                                    showNewRoomForm={this.showNewRoomForm}/>;
        } else if (this.state.show === "newroom"){
            return <AddRoomForm showRoomConfig={this.showRoomConfig} updateRooms={this.updateRoomsFromServer}/>;
        } else {
            return <HowTo showRoomConfig={this.showRoomConfig} />;
        }
    }
}
