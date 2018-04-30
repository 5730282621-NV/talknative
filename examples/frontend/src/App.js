import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage.js';
import SelectRoomPage from './SelectRoom/SelectRoomPage.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/selectRoom" component={SelectRoomPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
