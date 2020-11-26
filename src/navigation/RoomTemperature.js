import React from 'react';
import NavigationCross from "./NavigationCross";

export default class RoomTemperature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTemp: 10
        }
    }

    keyHandler = (event) => {
        if (event.key === 'ArrowUp') {
            if (this.state.currentTemp + 1 <= 40) {
                this.setState({currentTemp: this.state.currentTemp + 1});
            }
        }
        if (event.key === 'ArrowDown') {
            if (this.state.currentTemp - 1 >= 0){
                this.setState({currentTemp: this.state.currentTemp - 1});
            }
        }
        if (event.key === 'ArrowLeft') {
            this.props.handleViewChange('overview');
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyHandler);

        this.props.ws.onmessage = evt => {
            let message = '';
            try{
                message = JSON.parse(evt.data)
                console.log('RoomTemperature: ' + message)
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
        let display = <span className="nav-middle">{this.state.currentTemp} Grad</span>
        return (
            <div className="room-temperature">
                <h1>{this.props.room} - Temperature</h1>
                <NavigationCross up={'+'} down={'-'} left={'BACK'} right={null} middle={display}/>
            </div>
        )
    }
}
