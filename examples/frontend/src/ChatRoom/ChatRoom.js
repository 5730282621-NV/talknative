  
import React, { Component } from 'react';
import './ChatRoom.css';
import { pic } from './images/speech-bubble.png'
class ChatRoomPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      // username:this.props.current_user,
      username:"Jijy",
      displayname:"",
      native_lang:"",
      // chat_room_id: this.props.chat_room_id
      chat_room_id:"TH01",
      last_seen_msg_id:"",
      list: [],
      inputValue:""
    }
    this.setPersonalInfo = this.setPersonalInfo.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    // this.getMsgID = this.getMsgID.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.getNewMsg = this.getNewMsg.bind(this);
    this.getLastSeen = this.getLastSeen.bind(this);
    this.renderNewMsg = this.renderNewMsg.bind(this);
}
////////////////////////////////////////////////////////////// CALL BACKEND API ////////////////////////////////////////////////////////////
  setPersonalInfo(){
    let body = { username: this.state.username};
        fetch('/users/get_info/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(result => {
          if (result.result) {
            this.setState({
              displayname:result.displayname,
              native_lang:result.native_lang
            });
            console.log(this.state)
          }
        });
  }
  
  componentDidMount(){
    this.setPersonalInfo(); 
    this.interval = setInterval(() =>{this.getNewMsg();},4000)
  }
   
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  sendMessage(){
    console.log("send msg",this.state.inputValue)
    var msg_id
    let body = { 
      chat_room_id: this.state.chat_room_id
    };
        fetch('/chat/get_msg_id/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(result=>{
        let body2 = { 
          chat_room_id: this.state.chat_room_id,
          msg:this.state.inputValue,
          username: this.state.username,
          msg_id: result.msg_id+1
        };
            fetch('/chat/send_msg/', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(body2)
            })
            .then(res => res.json())
            .then(result => {
              if(!result.result){
                console.log("error")
              }
            })
            .then(result=>{
              let body3 = { chat_room_id: this.state.chat_room_id};
              fetch('/chat/update_last_msg_id/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(body3)
              })
            .then(res => res.json())
            .then(result => {
              if(!result.result){
                console.log("error")
              }
            })             
            });
      })
    this.clearInputValue();
  }

  leaveRoom(){
    let body = { 
      username: this.state.username,
      chat_room_id: this.state.chat_room_id};
        fetch('/chat/delete_session/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(result => {
          
        });
    let body2 = {chat_room_id: this.state.chat_room_id};
        fetch('/chat/delete_n_user/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(body2)
        })
        .then(res => res.json())
        .then(result => {
          window.location="/selectRoom";
          
        });
  }
  getNewMsg(last_seen_msg_id){
    console.log("get new msg ();")
    let body0 = { 
      username: this.state.username,
      chat_room_id: this.state.chat_room_id};
        fetch('/chat/get_last_seen/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(body0)
        })
        .then(res => res.json())
        .then(result => {
          if(result.result){
            this.setState({last_seen_msg_id: result.last_seen_msg_id});
            return result.last_seen_msg_id;
          }
        })
        .then( last_seen_msg_id => {
          let body = { 
          msg_id: last_seen_msg_id,
          chat_room_id: this.state.chat_room_id};

          fetch('/chat/get_new_msg/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
          })
        .then(res => res.json())
        .then(result => {
        console.log("before if not success",result)
        console.log("before if not success",this.state.last_seen_msg_id)
        if(!result.result){return;}
        this.renderNewMsg(result.msg_list);
          let body2 = { 
            username: this.state.username,
            last_seen_msg_id: result.msg_list[result.msg_list.length-1].msg_id,
            // last_seen_msg_id: 0,
            chat_room_id: this.state.chat_room_id};

          fetch('/chat/update_last_seen/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body2)
          })

        .then(res => res.json())
        .then(result => {
            console.log(result);

        })
      });  
    });
  }
  getLastSeen(){
    let body = { 
      username: this.state.username,
      chat_room_id: this.state.chat_room_id};
        fetch('/chat/get_last_seen/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(result => {
          if(result.result){
            this.setState({last_seen_msg_id: result.last_seen_msg_id});
            return result.last_seen_msg_id;
          }
          else{
            return this.state.last_seen_msg_id;
          }
        });
  }


////////////////////////////////////////////////////////////// RENDERING ////////////////////////////////////////////////////////////

  renderNewMsg(msg_list){
    let new_list = this.state.list
    for (var i = 0; i < msg_list.length; i++) { 
      if(msg_list[i].username == this.state.username){
        new_list.push(<li><span className='badge right c5 f6'> { msg_list[i].username }</span></li>);
        new_list.push(<li><span className='badge right'> { msg_list[i].msg }</span></li>);
      }
      else{
        new_list.push(<li><span className='badge left c5 f6'> { msg_list[i].username }</span></li>);
        new_list.push(<li><span className='badge left'> { msg_list[i].msg }</span></li>);       
      }
      console.log("render new msg", this.state.list)
    }
    this.setState({list:new_list});
    // message = $(".message-input input").val();
    // if($.trim(message) == '') {
    //   return false;
    // }
    // $('.message-input input').val(null);
    // $('.contact.active .preview').html('<span>You: </span>' + message);
    // $(".messages").animate({ scrollTop: $(document).height() }, "fast");
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  clearInputValue() {
    this.setState({
      inputValue: ""
    });   
  }
  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 c6" style={{"height":"50px"}}>
          </div>
        </div>
        <div className="row" >
          <div className="col-lg-4 c2" style={{"height":"600px"}}>
            <p style={{"color":"#fff"}}>Display Name : {this.state.displayname}</p>
            <p style={{"color":"#fff"}}>Native Language : {this.state.native_lang}</p>
            <button type="button" className="btn c4" onClick={this.leaveRoom}>leave</button>

          </div>
          <div className="col-lg-8 c5" style={{"height":"600px"}}>
            <div className="row">
              <div className="col-lg-12 c5 messages" style={{"height":"400px"}}>
                <ul className="f5">
                  {this.state.list}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 message-input c3" style={{"height":"200px"}}>
                <div className="wrap">
                  <input style={{"height":"150px"}}type="text" placeholder="Write your message..." value={this.state.inputValue} onChange={this.updateInputValue.bind(this)}/>
                  <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                  <button className="btn c4" onClick={this.sendMessage}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
  
  export default ChatRoomPage;
