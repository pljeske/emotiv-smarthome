import React from "react";
import {Button} from "react-bootstrap";
import RoomElement from "./RoomElement";


export default class RoomConfig extends React.Component {
    render(){
        let fields = [];
        for (let i in this.props.rooms) {
            let room = this.props.rooms[i];
            fields.push(<RoomElement key={room.id} id={room.id} name={room.room} lightEndpoint={room.light.endpoint}
                                     temperatureEndpoint={room.temperature.endpoint} deleteRoom={this.props.deleteRoom} />)
        }
        fields.push(<Button variant="secondary" onClick={this.props.showHowTo}>How To</Button>);
        fields.push(<Button variant="primary" onClick={this.props.showNewRoomForm}>New Room</Button>)
        return (
            <div>
                <h1>SmartHome+ Configuration</h1>
                {fields}
            </div>
        )
    }
}
