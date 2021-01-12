import React from 'react';
import axios from 'axios';
import {CONFIG_SERVER_URL} from "../App";
import {Redirect} from 'react-router-dom';
import {Button} from "react-bootstrap";

export default class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name: '',
            lightEndpoint: '',
            temperatureEndpoint: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange = (event) => {
        this.setState({
            redirect: false,
            name: event.target.value,
            lightEndpoint: this.state.lightEndpoint,
            temperatureEndpoint: this.state.temperatureEndpoint
        });
    }
    handleLightChange = (event) => {
        this.setState({
            redirect: false,
            name: this.state.name,
            lightEndpoint: event.target.value,
            temperatureEndpoint: this.state.temperatureEndpoint
        });
    }
    handleTemperatureChange = (event) => {
        this.setState({
            redirect: false,
            name: this.state.name,
            lightEndpoint: this.state.lightEndpoint,
            temperatureEndpoint: event.target.value
        });
    }

    handleSubmit(event) {
        let that = this;
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }

        axios.post(CONFIG_SERVER_URL + '/rooms/', this.state, config)
            .then(function (response) {
                console.log(response)
                that.props.updateRooms();
                that.props.handleButton();
            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    }

    renderRedirect = () => {
        return (
            <form onSubmit={this.handleSubmit} onReset={this.props.handleButton}>
                <label>
                    Room name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label><br />
                <label>
                    Endpoint light:
                    <input type="text" value={this.state.lightEndpoint} onChange={this.handleLightChange} />
                </label><br />
                <label>
                    Endpoint temperature:
                    <input type="text" value={this.state.temperatureEndpoint} onChange={this.handleTemperatureChange} />
                </label><br />
                <Button variant="secondary" onClick={this.props.handleButton}>Back</Button>
                <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
            </form>
        )
    }

    render() {
        return <div>
            {this.renderRedirect()}
        </div>
    }
}
