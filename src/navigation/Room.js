import React from 'react';
import RoomOverview from "./RoomOverview";
import RoomLight from "./RoomLight";
import RoomTemperature from "./RoomTemperature";

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'overview'
        }
    }

    handleViewChange = (view) => {
        console.log("Room - handleViewChange")
        this.setState({view: view});
    }

    render() {
        let viewComponent = <RoomOverview
            room={this.props.room}
            light={this.props.light}
            temperature={this.props.temperature}
            handleViewChange={this.handleViewChange}
            handleRoomChange={this.props.changeRoomHandler}
            ws={this.props.websocket}
        />
        if (this.state.view === 'light') {
            viewComponent = <RoomLight
                room={this.props.room}
                light={this.props.light}
                temperature={this.props.temperature}
                handleViewChange={this.handleViewChange}
                handleRoomChange={this.props.changeRoomHandler}
                ws={this.props.websocket}
            />
        }
        if (this.state.view === 'temperature') {
            viewComponent = <RoomTemperature
                room={this.props.room}
                light={this.props.light}
                temperature={this.props.temperature}
                handleViewChange={this.handleViewChange}
                handleRoomChange={this.props.changeRoomHandler}
                ws={this.props.websocket}
            />
        }
        return viewComponent;
    }
}
