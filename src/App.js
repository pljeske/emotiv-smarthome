import './App.css';
import Main from "./navigation/Main";
import AssistanceSection from "./assistance/AssistanceSection";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import axios from "axios";
import config from './config.json';

export const CONFIG_SERVER_URL = config.CONFIG_SERVER_URL;
export const SMARTHOME_URL = config.SMARTHOME_URL;
export const EMOTIV_WEBSOCKET = config.EMOTIV_WEBSOCKET;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: null
        }
    }
    componentDidMount() {
        let that = this;
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }
        axios.get(CONFIG_SERVER_URL + '/rooms/', config)
            .then(function (response) {
                that.setState({
                    rooms: response.data
                });
            }).catch(function (error) {
                console.log("ERROR: " + error);
            });
    }

    render(){
        if (this.state.rooms != null) {
            return (
                <div className="App">
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                        crossOrigin="anonymous"
                    />
                    <header className="App-header">
                        <Router>
                            <Switch>
                                <Route path="/assistance">
                                    <AssistanceSection/>
                                </Route>
                                <Route path="/">
                                    <Main rooms={this.state.rooms} />
                                </Route>
                            </Switch>
                        </Router>
                    </header>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <p>Loading...</p>
                    </header>
                </div>
                )

        }

    }
}

export default App;
