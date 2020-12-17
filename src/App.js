import './App.css';
import Main from "./navigation/Main";
import AssistanceSection from "./assistance/AssistanceSection";
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <Switch>
                  <Route path="/assistance">
                      <AssistanceSection/>
                  </Route>
                  <Route path="/">
                      <Main />
                  </Route>
              </Switch>
          </Router>
      </header>
    </div>
  );
}

export default App;
