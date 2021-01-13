import React from 'react';
import axios from 'axios';

import bulbBlack from '../icons/lightbulb_off.svg';
import bulbYellow from '../icons/lightbulb_on.svg';
import NavigationCross from "./NavigationCross";
import lightSwitchIcon from "../icons/lightswitch.svg";

import { SMARTHOME_URL } from "../App";

export default class RoomLight extends React.Component {
    constructor(props) {
        super(props);
        this.refNavigationCross = React.createRef();
        this.state = {
            on: true
        }
        this.handleStateChange = this.handleStateChange.bind(this)
    }

    getStatusFromApi = () => {
        let that = this;
        axios.get(SMARTHOME_URL + this.props.light.endpoint)
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

    handleStateChange(command) {
        if(command === 'switchLight') {
            this.setState(prevState => ( {
                on: !prevState.on} ));
            this.switchLightHandler();
        }
    }

    switchLightHandler = () => {
        axios.get(SMARTHOME_URL + this.props.light.endpoint + '/switch')
            .then(res => {
                if (res.status === 200) {
                    this.getStatusFromApi();
                }
            })
    }


    keyHandler = (event) => {
        if (event.key === 'ArrowRight') {
            this.refNavigationCross.current.setState({movement: 'right', command: 'switchLight'});
        }
        if (event.key === 'ArrowDown') {
            this.refNavigationCross.current.setState({movement: 'down', targetView: 'overview'});
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyHandler);

        this.getStatusFromApi();

        this.props.ws.onmessage = evt => {
            let message = '';
            try{
                message = JSON.parse(evt.data);
                switch(message.action) {
                    case "movePull":
                        this.refNavigationCross.current.setState({movement: 'down', targetView: 'overview'});
                        break;
                    case "moveRight":
                        this.refNavigationCross.current.setState({movement: 'right', command: 'switchLight'});
                        break;
                    case "moveLeft":
                        console.log("No action assigned for left -> dismiss this action.");
                        break;
                    case "moveNeutral":
                        this.refNavigationCross.current.setState({movement: ''});
                        break;
                    default:
                        console.log("Unrecognisable mental command." + message.action);
                        break;
                }
            } catch (exception) {
                message = evt.data;
                console.log(message)
            }
        }

    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyHandler);
    }

    render() {
        let back = <p className="arrow-text arrow-text--single">BACK</p>
        let lightingStatus = this.state.on ? "ON" : "OFF";
        let lightSwitch = <img src={lightSwitchIcon} className="right-arrow-img svg" />
        let bulb = this.state.on ? <img alt="bulb black" src={bulbYellow} className="info-img"/> : <img alt="light bulb" src={bulbBlack} className="info-img"/>
        let display = <span className="nav-middle">{bulb}<p className="line-two"><strong>{lightingStatus}</strong></p></span>
        return (
            <div>
                <h1>Light</h1>
                <h2>{this.props.room}</h2>
                <NavigationCross ref={this.refNavigationCross} up={display} down={back} right={lightSwitch}
                                 handleStateChange={this.handleStateChange} handleViewChange={this.props.handleViewChange}/>
            </div>
        )

    }
}
