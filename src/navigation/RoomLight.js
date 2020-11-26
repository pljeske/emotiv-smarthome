import React from 'react';
import axios from 'axios';

import bulbBlack from '../icons/streamline-bulb-black.png';
import bulbYellow from '../icons/streamline-bulb-yellow.png';
import NavigationCross from "./NavigationCross";

const API_BASE = "http://192.168.178.32:1880/endpoint";
// const API_BASE = "http://localhost:1880/endpoint";

export default class RoomLight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: false
        }
    }

    getStatusFromApi = () => {
        let that = this;
        axios.get(API_BASE + this.props.light.endpoint)
            .then(function (response) {
                if (response.data.state === 'on') {
                    that.setState({on: true});
                } else {
                    that.setState({on: false});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    switchLightHandler = () => {
        axios.get(API_BASE + this.props.light.endpoint + '/switch')
            .then(res => {
                if (res.status === 200) {
                    this.getStatusFromApi();
                }
            })
    }

    keyHandler = (event) => {
        if (event.key === 'ArrowUp') {
            this.switchLightHandler();
        }
        if (event.key === 'ArrowLeft') {
            this.props.handleViewChange('overview');
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyHandler);
        this.getStatusFromApi();

        // this.ws.onopen = () => {
        //     console.log('connected to websocket')
        // }
        this.props.ws.onmessage = evt => {
            let message = '';
            try{
                message = evt.data.split(' - ')[1]
                message = JSON.parse(message)
                console.log('RoomLight: ' + JSON.stringify(message))
                if(message.command === 'push') {
                    this.switchLightHandler()
                }
                if (message.command === 'pull') {
                    this.props.handleViewChange('overview');
                }
            } catch (exception) {
                console.log(exception)
                message = evt.data;
                console.log(message)
            }
        }
        // this.ws.onclose = () => {
        //     console.log('disconnected from websocket')
        // }
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyHandler);
    }

    render(){
        let display = <Display on={this.state.on}/>
        return (
            <div>
                <h1>{this.props.room} - Light</h1>
                <NavigationCross up={'switch'} left={'BACK'} down={null} right={null} middle={display}/>
            </div>
            )

    }
}

class Display extends React.Component {
    render(){
        let iconSource = bulbBlack;
        if (this.props.on) {
            iconSource = bulbYellow;
        }

        return (
            <img src={iconSource} alt="bulb" className="nav-middle"/>
        )
    }

}

