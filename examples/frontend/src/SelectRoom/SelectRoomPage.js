import React, { Component } from 'react';
import LanguageMenu from './LanguageMenu.js'
import './SelectRoom.css'

class SelectRoomPage extends Component {
    state={
      rooms:[{}],
      displayname:"sasicha",
      native_lang:"Thai"
    }

    componentWillMount(){
      console.log("fetch");
      fetch('/selectRoom/getAllRoom')
        .then( response=> {
            return response.json()
        }).then(result => {
          console.log(result);
          this.setState({rooms: result});
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
          <LanguageMenu language={tempLan} rooms={tempRooms}  />
        )}
      })
      

      return (
        <div  class="select-room-page">
          <div className="select-room-user-profile">
            <div className="profile-pic"></div>
            <div className="profile-info">
              <div>{this.state.displayname}</div>
              <div>Native Language : {this.state.native_lang}</div>
            </div>
          </div>
          <div className="select-room-content">{languageList}</div>
        </div>
      );
    }
  }
  
  export default SelectRoomPage;