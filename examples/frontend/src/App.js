import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage.js';

class App extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/login" component={LoginPage} />
        </Router>
      </div>
    );
  }
}

export default App;
