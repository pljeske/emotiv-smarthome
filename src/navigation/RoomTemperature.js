import React from 'react';
import NavigationCross from "./NavigationCross";
import plusIcon from "../icons/add.svg";
import minusIcon from "../icons/minus.svg";
import targetIcon from "../icons/target_icon.png";
import tempIcon from "../icons/temp_icon.png";

import axios from 'axios';
import {HASSIO_URL} from "./Main";

export default class RoomTemperature extends React.Component {
    constructor(props) {
        super(props);
        this.refNavigationCross = React.createRef();
        this.state = {
            currentTemp: 10,
            goalTemp: 10
        }
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    keyHandler = (event) => {
        if (event.key === 'ArrowRight') {
            this.refNavigationCross.current.setState({movement: 'right', command: 'increase'});
        }
        if (event.key === 'ArrowLeft') {
            this.refNavigationCross.current.setState({movement: 'left', command: 'decrease'});
        }
        if (event.key === 'ArrowDown') {
            this.refNavigationCross.current.setState({movement: 'down', targetView: 'overview'});
        }
    }

    handleStateChange(command) {
        if(command === 'increase' && this.state.currentTemp + 1 <= 40) {
            this.setState({
                goalTemp: this.state.goalTemp + 1,
                currentTemp: this.state.currentTemp
            });
            console.log("TRACKED.")
        } else if (command === 'decrease' && this.state.currentTemp - 1 >= 0) {
            this.setState({
                goalTemp: this.state.goalTemp - 1,
                currentTemp: this.state.currentTemp
            });
        }
    }

    getStatusFromApi = () => {
        let that = this;
        axios.get(HASSIO_URL + this.props.temperature.endpoint)
            .then(function (response) {
                if (response.data) {
                    that.setState({
                        currentTemp: Math.round(response.data.current_temp),
                        goalTemp: response.data.goal_temp
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
                        this.refNavigationCross.current.setState({movement: 'right', command: 'increase'});
                        break;
                    case "moveLeft":
                        this.refNavigationCross.current.setState({movement: 'left', command: 'decrease'});
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
        let display = <span className="nav-middle">
            <img className="current-temp-icon" src={tempIcon} alt="current temp"/><p className="line-one ur">{this.state.currentTemp}</p>
            <img className="goal-temp-icon" src={targetIcon} alt="goal temp"/><p className="line-two dr">{this.state.goalTemp}</p>
        </span>
        let plusDisplay = <img alt="Plus icon" src={plusIcon} className="right-arrow-img svg"/>
        let minusDisplay = <img alt="Minus icon" src={minusIcon} className="left-arrow-img svg"/>
        let back = <p className="arrow-text arrow-text--single">BACK</p>
        return (
            <div className="room-temperature">
                <h1>Temperature</h1>
                <h2>{this.props.room}</h2>
                <NavigationCross ref={this.refNavigationCross} up={display} down={back} left={minusDisplay} right={plusDisplay}
                                 handleViewChange={this.props.handleViewChange} handleStateChange={this.handleStateChange} />
            </div>
        )
    }
}
