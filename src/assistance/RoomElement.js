import React from 'react';
import './RoomElement.css';
import {Card, Button} from 'react-bootstrap';
import axios from 'axios';
import {CONFIG_SERVER_URL} from "../App";

export default class RoomElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            lightEndpoint: this.props.lightEndpoint,
            temperatureEndpoint: this.props.temperatureEndpoint
        }
    }

    preRender = () => {
        return (
            <div className="w-400">
                <Card bg="secondary" border="primary" >
                    <Card.Header>
                        {this.state.name}
                        <Button variant="danger" onClick={() => this.props.deleteRoom(this.props.id)}>Delete</Button>
                    </Card.Header>
                    <Card.Body>
                        Light: {this.state.lightEndpoint} <br/>
                        Temperature: {this.state.temperatureEndpoint}
                    </Card.Body>
                </Card>
            </div>
            );
    }

    render(){
        if (this.state.name == null) {
            return <div className="room-element">
                New Room
            </div>
        } else {
            return this.preRender();
            // return <div className="room-element">
            //     <p>
            //         Room: {this.state.name}<br/>
            //         Light: {this.state.lightEndpoint}<br/>
            //         Temperature: {this.state.temperatureEndpoint}<br/>
            //     </p>
            // </div>
        }
    }
}
