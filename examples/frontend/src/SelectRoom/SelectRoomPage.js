import React, { Component } from 'react';
import LanguageMenu from './LanguageMenu.js'
import './SelectRoom.css'

class SelectRoomPage extends Component {
    constructor(props){
      super(props);
      console.log(this.props);
      this.state={
        rooms:[{}],
        userProfile:{},
        username:props.current_user
      }
    }

    componentWillMount(){
      console.log("fetch");
      fetch('/selectRoom/getAllRoom')
        .then( response=> {
            return response.json()
        }).then(result => {
          console.log("get all room successfully");
          console.log(result);
          result.push({language:"end"})
          this.setState({rooms: result});
        });


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
      console.log(this.state);
      let currentLan = this.state.rooms[0].language;
      let roomsLan=[];
      let languageList = this.state.rooms.map(room =>{
        if(room.language==currentLan){
          roomsLan.push(room)
        }
        else{
        let tempLan=currentLan;
        let tempRooms=roomsLan;
        currentLan=room.language;
        roomsLan=[room];
        return(
          <LanguageMenu language={tempLan} rooms={tempRooms} username={this.state.username} />
        )}
      })
      

      return (
        <div  class="select-room-page">
          <div className="select-room-header">   
            <div className="header-icon"></div>
            <div>TALKNATIVE</div>
          </div>
          <div className="select-room-body">
            <div className="select-room-user-profile">
              <div className="profile-pic"></div>
              <div className="profile-info">
                <div style={{fontWeight: "bold",fontSize:"20px"}}>{this.state.userProfile.displayname}</div>
                <div>Native Language : {this.state.userProfile.native_language}</div>
              </div>
            </div>
            <div className="select-room-content">{languageList}</div>
          </div>
        </div>
      );
    }
  }
  
  export default SelectRoomPage;