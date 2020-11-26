import React from 'react';
import NavigationCross from "./NavigationCross";
import lightBulb from '../icons/streamline-bulb-yellow.png';
import temperatureMeter from '../icons/streamline-temp-white.png';

export default class RoomOverview extends React.Component {
    constructor(props) {
        super(props);
    }

    keyHandler = (event) => {
        if (event.key === 'ArrowUp') {
            this.props.handleViewChange('light');
        }
        if (event.key === 'ArrowDown') {
            this.props.handleViewChange('temperature');
        }
        if (event.key === 'ArrowRight') {
            this.props.handleRoomChange();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyHandler);

        this.props.ws.onmessage = evt => {
            let message = '';
            try{
                message = JSON.parse(evt.data)
                console.log('RoomOverview: ' + message)
            } catch (exception) {
                message = evt.data;
                console.log(message)
            }
        }
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyHandler);
    }

    render(){
        let lightDisplay = <img src={lightBulb} className="up-arrow"/>
        let tempDisplay = <img src={temperatureMeter} className="down-arrow"/>
        return (
            <div className="room-overview">
                <h1>{this.props.room}</h1>
                <NavigationCross left={null} right={'next Room'} up={lightDisplay} down={tempDisplay}/>
            </div>
        )
    }
}
