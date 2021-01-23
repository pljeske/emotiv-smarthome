import React from 'react';
import './RoomElement.css';
import {Card, Button} from 'react-bootstrap';

export default class RoomElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            lightEndpoint: this.props.lightEndpoint,
            temperatureEndpoint: this.props.temperatureEndpoint
        }
    }

    render(){
        return (
            <div className="w-400 mb-2">
                <Card bg="secondary" border="primary" >
                    <Card.Header>
                        <strong>{this.state.name}</strong>
                        <Button variant="danger ml-2" onClick={() => this.props.deleteRoom(this.props.id)}>Delete</Button>
                    </Card.Header>
                    <Card.Body>
                        Light: {this.state.lightEndpoint} <br/>
                        Temperature: {this.state.temperatureEndpoint}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
