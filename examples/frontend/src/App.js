import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage.js';
import SelectRoomPage from './SelectRoom/SelectRoomPage.js';
import ChatRoomPage from './ChatRoom/ChatRoom.js';


class App extends React.Component {
  constructor(props) {
    super(props)

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);

    // Set some state
    this.state = {
      "current_user": ""
    };
  }

  // This method will be sent to the child component
  handler(username) {
    this.setState({
      "current_user": username
    });
  }

  render() {
    const MyLoginPage = (props) => {
      return (
        <LoginPage
          action={this.handler.bind(this)}
        />
      );
    }
    const MyChatRoomPage = (props) => {
      return (
        <ChatRoomPage 
          current_user={this.state.current_user}
        />
      );
    }
    const MySelectRoomPage = (props) => {
      return (
        <SelectRoomPage
          current_user={this.state.current_user}
        />
      );
    }
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={MyLoginPage} />
            <Route exact path="/selectRoom" component={MySelectRoomPage} />
            <Route path="/Chat/:chat_room_id" component={MyChatRoomPage}/>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
