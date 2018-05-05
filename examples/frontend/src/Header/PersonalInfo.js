import React, { Component } from 'react';

class SelectRoomPage extends Component {
    constructor(props){
      super(props);
      this.state={
        userProfile:{},
        username:this.props.current_user,
        imgUrl:''
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
        return result;
      }).then(result =>{
          console.log(result.profile_pic);
          if(result.profile_pic==null){
            
            this.setState({imgUrl: ''}); 
          }
          else{
            fetch('/register/selectProfilePic', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  "fileName" : result.profile_pic
              })
            }).then(response => {
              return response.text();
            }).then(url => {
                console.log(url);
                this.setState({imgUrl: url});
            })
          }       
        }
      )
      .catch(err => {
        console.log(err);
      });


    }
  
    render() {
      let img = <div></div>
      if(this.state.imgUrl!=''){
        img = <div className=""><img className="profile-pic" src={this.state.imgUrl}/></div>
      }

      return (
            <div className="select-room-user-profile">
              <div className="profile-pic-default">{img}</div>
              <div className="profile-info">
                <div style={{fontWeight: "bold",fontSize:"20px"}}>{this.state.userProfile.displayname}</div>
                <div>Native Language : {this.state.userProfile.native_language}</div>
              </div>
            </div>
      );
    }
  }
  
  export default SelectRoomPage;