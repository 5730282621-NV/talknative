import React, { Component } from 'react';
import LanguageMenu from './LanguageMenu.js'
import Header from '../Header/Header.js'
import PersonalInfo from '../Header/PersonalInfo.js'
import './SelectRoom.css'

class SelectRoomPage extends Component {
    constructor(props){
      super(props);
      console.log(this.props);
      this.state={
        rooms:[{}],
        username:this.props.current_user
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
          <Header />
          <div className="select-room-body">
            <PersonalInfo current_user={this.state.username} />
            <div className="select-room-content">{languageList}</div>
          </div>
        </div>
      );
    }
  }
  
  export default SelectRoomPage;