import React from "react";
import {Carousel, Container, Row, Col} from "react-bootstrap";
import firstSlide from "../icons/base.png";
import './HowTo.css';


export default class HowTo extends React.Component {
    render(){
        return (
            <Container>
                <Row>
                    <h2 className="display-4 header-text">SmartHome+ Assistance</h2>
                </Row>
                <Row className="justify-content-center">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={firstSlide}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>Set up your SmartHome+</h3>
                                    <p>CAUTION: Do not make changes in this area unless you know what you are doing.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={firstSlide}
                                    alt="Second slide"
                                />

                                <Carousel.Caption>
                                    <h3>Configure rooms for your barrier-free smart home</h3>
                                    <p>Add new rooms or manage the existing ones.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={firstSlide}
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Check the individual endpoints</h3>
                                    <p>You can see the configured endpoints for each room and check the configured URL.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                </Row>
                <Row className="justify-content-center">
                    <p className="mt-4">
                        <button className="btn btn-outline-proceed" onClick={this.props.showRoomConfig}>I know what I am doing: Proceed to room configuration</button>
                    </p>
                </Row>
            </Container>
        );
    }
}
