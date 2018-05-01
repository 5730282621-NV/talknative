import React, { Component } from 'react';

class SelectRoomPage extends Component {
    constructor(props){
      super(props);
      this.state={
        userProfile:{},
        username:this.props.current_user
      }
    }

    componentWillMount(){
      fetch('/selectRoom/getUserProfile',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": this.state.username
        })
      }).then(response => {
        return response.json()}
      ).then(result => {
        console.log("get user profile successfully");
        console.log(result);
        this.setState({userProfile: result});
      })
      .catch(err => {
        console.log(err);
      });
    }
  
    render() {
     

      return (
            <div className="select-room-user-profile">
              <div className="profile-pic"></div>
              <div className="profile-info">
                <div style={{fontWeight: "bold",fontSize:"20px"}}>{this.state.userProfile.displayname}</div>
                <div>Native Language : {this.state.userProfile.native_language}</div>
              </div>
            </div>
      );
    }
  }
  
  export default SelectRoomPage;