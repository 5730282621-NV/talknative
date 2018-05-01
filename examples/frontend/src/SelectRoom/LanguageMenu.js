import React, { Component } from 'react'; 
import {withRouter} from 'react-router-dom'

class LanguageMenu extends Component {
    constructor(){
      super();
      this.state={
        roomVisible:false,
      }
    }
  
    
    handleClickLanguage(){
      if(this.state.roomVisible) this.setState({roomVisible:false})
      else this.setState({roomVisible:true})
    }

    handleSelectRoom(room){
      console.log(this.props.username + " : " + room.chat_room_id);
      fetch('/selectRoom/EnterChatRoom',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "chat_room_id": room.chat_room_id,
            "username": this.props.username
        })
      }).then(response => {return response.json()})
      .then(result => {
        console.log("Enter chat room : "+result.chat_room_id);
        this.props.history.push("/Chat/"+result.chat_room_id);
      })
    }
  
    render() {
      let roomList;
      if(this.state.roomVisible) {
        roomList = this.props.rooms.map(room =>{
          let imgSrc;
          try{
            imgSrc = require('./asset/chat_icon/'+room.chat_room_id+'.png')
          }
          catch(err) {
            imgSrc = require('./asset/chat_icon/'+'TH01'+'.png')
          }
          return (
          <div className="room-menu" >
            <div className="chat-room-icon-detail">
              {<img className="chat-room-icon" src={imgSrc} />}
              <div>
                <div style={{fontSize:"20px"}}>{room.chat_room_id} : {room.chat_room_name}</div>
                <div style={{fontSize:"17px"}}>members : {room.n_active_user}</div>
              </div>
            </div>
            <button className="enter-room-button" onClick={this.handleSelectRoom.bind(this,room)}>ENTER CHAT ROOM</button>
          </div>
          )
        })
      };
      return (
        <div>
          <div  class="language-menu" onClick={this.handleClickLanguage.bind(this)}>
              {this.props.language.toUpperCase()}
          </div>
          {roomList}
        </div>
      );
    }
  }
  
  export default withRouter(LanguageMenu);