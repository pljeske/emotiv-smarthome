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
        fields.push(<Button className="mr-5" variant="outline-info" onClick={this.props.showHowTo}>Tutorial</Button>);
        fields.push(<Button variant="primary" onClick={this.props.showNewRoomForm}>Add new Room</Button>)
        return (
            <div>
                <h2>SmartHome+ Assistance</h2>
                {fields}
            </div>
        )
    }
}
