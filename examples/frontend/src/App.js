import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage.js';

class App extends Component {
<<<<<<< HEAD
  componentDidMount(){
    const url_album = '/chat'
    fetch(url_album, {
      method: 'POST',
    })
    .then(res => res.json())
    .then(results => {
      console.log(results)
      }
    )
=======
  componentDidMount() {
    
>>>>>>> 4a766d84014b96de469e44c4723b223457dcf1f3
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
