import React from "react";
import {Button} from "react-bootstrap";
import {Jumbotron} from "react-bootstrap";
import './HowTo.css';


export default class HowTo extends React.Component {
    render(){
        return (
            <Jumbotron className="howto-text">
                <h1 className="display-4 header-text">SmartHome+ Assistance Section</h1>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <p className="lead">
                    <Button variant="primary" onClick={this.props.showRoomConfig}>Room Configuration</Button>
                </p>
            </Jumbotron>
        );
    }
}
