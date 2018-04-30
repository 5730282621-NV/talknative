import React, { Component } from 'react'; 

class LanguageMenu extends Component {
    state={
      roomVisible:false,
    }
    handleClick(){
      if(this.state.roomVisible) this.setState({roomVisible:false})
      else this.setState({roomVisible:true})
    }
  
    render() {
      let roomList;
      if(this.state.roomVisible) {
        roomList = this.props.rooms.map(room =>{
          return (
          <div className="room-menu">
            <div>{room.chat_room_id} : {room.chat_room_name}</div>
            <div>members : {room.n_active_user}</div>
          </div>
          )
        })
      };
      return (
        <div>
          <div  class="language-menu" onClick={this.handleClick.bind(this)}>
              {this.props.language.toUpperCase()}
          </div>
          {roomList}
        </div>
      );
    }
  }
  
  export default LanguageMenu;