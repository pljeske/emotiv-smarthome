import React from 'react';
import NavigationCross from "./NavigationCross";
import lightBulb from '../icons/streamline-bulb-yellow.png';
import temperatureMeter from '../icons/streamline-temp-white.png';

export default class RoomOverview extends React.Component {
    constructor(props) {
        super(props);
        this.refNavigationCross = React.createRef();
    }

    keyHandler = (event) => {
        if (event.key === 'ArrowDown') {
            this.refNavigationCross.current.setState({movement:'down', targetView:'room'})
        }
        if (event.key === 'ArrowRight') {
            this.refNavigationCross.current.setState({movement:'right', targetView:'temperature'});
        }
        if (event.key === 'ArrowLeft') {
            this.refNavigationCross.current.setState({movement:'left', targetView:'light'})
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyHandler);

        this.props.ws.onmessage = evt => {
            let message = '';
            try{
                message = JSON.parse(evt.data);
                switch(message.action) {
                    case "movePull":
                        this.refNavigationCross.current.setState({movement: 'down', targetView: 'room'});
                        break;
                    case "moveRight":
                        this.refNavigationCross.current.setState({movement: 'right', targetView: 'temperature'});
                        break;
                    case "moveLeft":
                        this.refNavigationCross.current.setState({movement: 'left', targetView: 'light'});
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

    render(){
        let lightDisplay = <img src={lightBulb} className="left-arrow-img"/>
        let tempDisplay = <img src={temperatureMeter} className="right-arrow-img"/>
        let infoStatus = <div className="logo"><p className="line-one">SMART</p><p className="line-two">HOME +</p></div>
        let nextRoom = <p className="arrow-text">Switch room</p>
        return (
            <div className="room-overview">
                <h1>{this.props.room}</h1>
                <NavigationCross ref={this.refNavigationCross} left={lightDisplay} right={tempDisplay} up={infoStatus} down={nextRoom}
                                 handleViewChange={this.props.handleViewChange} handleRoomChange={this.props.handleRoomChange}/>
            </div>
        )
    }
}
