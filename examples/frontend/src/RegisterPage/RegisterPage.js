import React, { Component } from 'react';
import './RegisterPage.css';

class RegisterPage extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            displayName: "",
            firstName: "",
            LastName: "",
            email: "",
            profilePicName: "bear.png",
            nativeLanguage: "Thai"
        }
    }

    componentDidMount() {
        this.setState({
            profilePicName: this.refs.profilePreview.value
        });

        fetch('/register/selectProfilePic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fileName" : 'bear.png'
            })
        }).then(response => {
            return response.text();
        }).then(url => {
            console.log(url);
            this.setState({
                profilePreview: url
            });
        })
    }

    usernameChanged() {
        this.setState({
            username: this.refs.username.value
        });
    }

    passwordChanged() {
        this.setState({
            password: this.refs.password.value
        });
    }

    confirmPasswordChanged() {
        this.setState({
            confirmPassword: this.refs.confirmPassword.value
        });
    }

    displayNameChanged() {
        this.setState({
            displayName: this.refs.displayName.value
        });
    }

    firstNameChanged() {
        this.setState({
            firstName: this.refs.firstName.value
        });
    }

    lastNameChanged() {
        this.setState({
            LastName: this.refs.lastName.value
        });
    }

    emailChanged() {
        this.setState({
            email: this.refs.email.value
        });
    }

    nativeLanguageChanged() {
        this.setState({
            nativeLanguage: this.refs.nativeLanguage.value
        });
    }

    profilePreviewChanged() {
        this.setState({
            profilePicName: this.refs.profilePreview.value
        });

        fetch('/register/selectProfilePic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fileName" : this.refs.profilePreview.value
            })
        }).then(response => {
            return response.text();
        }).then(url => {
            console.log(url);
            this.setState({
                profilePreview: url
            });
        })
    }

    submit(event) {
        console.log(this.state);

        let isOk = true;
        if(this.state.username == "") isOk = false;
        if(this.state.password == "") isOk = false;
        if(this.state.confirmPassword == "") isOk = false;
        if(this.state.displayName == "") isOk = false;
        if(this.state.firstName == "") isOk = false;
        if(this.state.lastName == "") isOk = false;
        if(this.state.email == "") isOk = false;
        if(this.state.nativeLanguage == "") isOk = false;

        if (!isOk) {
            alert('Please complete the form!');
        }

        fetch('/register/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
                "confirmPassword": this.state.confirmPassword,
                "displayName": this.state.displayName,
                "firstName": this.state.firstName,
                "LastName": this.state.LastName,
                "email": this.state.email,
                "nativeLanguage": this.state.nativeLanguage,
                "profilePicName": this.state.profilePicName
            })
        })
            .then(response => {
                return response.json();
            }).then(body => {
                console.log(body);
                if (body.isOk) {
                    window.location = "/";
                }
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="RegisterPage">
                <div className="RegisterPanel">
                    <form>
                        <div className="sign" >Sign up - user infomation</div>
                        <div className="Rform" >
                            <br />
                            <br />
                            <br />
                            Username
                            <input className="KeeText" type="text" ref="username" placeholder="USERNAME" onChange={this.usernameChanged.bind(this)} required/>
                            Password
                            <input className="KeePass" type="password" ref="password" placeholder="PASSWORD" onChange={this.passwordChanged.bind(this)} required/>
                            Confirm password
                            <input className="KeePass" type="password" ref="confirmPassword" placeholder="CONFIRM PASSWORD" onChange={this.confirmPasswordChanged.bind(this)} required/>
                            Display name
                            <input className="KeeText" type="text" ref="displayName" placeholder="DISPLAY NAME" onChange={this.displayNameChanged.bind(this)} required/>
                        </div>
                            <hr />
                            <br />
                            <div className="sign" >Personal infomation</div>
                            <br />
                            <br />
                            <br />
                        <div className="Rform" >
                            First name
                            <input className="KeeText" type="text" ref="firstName" placeholder="FIRST NAME" onChange={this.firstNameChanged.bind(this)} required/>
                            Last name
                            <input className="KeeText" type="text" ref="lastName" placeholder="LAST NAME" onChange={this.lastNameChanged.bind(this)} required/>
                            Email
                            <input className="KeeMail" type="email" ref="email" placeholder="EMAIL" onChange={this.emailChanged.bind(this)} required/>
                            Native language
                            <select className="KeeSelect" ref="nativeLanguage" value={this.state.nativeLanguage} onChange={this.nativeLanguageChanged.bind(this)} required>
                                <option className="KeeOption" value="Thai">Thai</option>
                                <option className="KeeOption" value="English">English</option>
                                <option className="KeeOption" value="Korean">Korean</option>
                                <option className="KeeOption" value="Japanese">Japanese</option>
                                <option className="KeeOption" value="Chinese">Chinese</option>
                            </select>
                            
                        </div>
                            <hr />
                            <div className="sign" >Profile Picture</div>
                            <br />
                            <br />
                            <br />
                        <div className="Rform" >
                            <div className="KeeProfileDiv">
                                <img className="KeeProfilePic" ref="profilePreview" src={this.state.profilePreview}/>
                            </div>
                            <select className="KeeSelect" ref="profilePreview" value={this.state.profilePicName} onChange={this.profilePreviewChanged.bind(this)} required>
                                <option className="KeeOption" value="bear.png">Bear</option>
                                <option className="KeeOption" value="bee.png">Bee</option>
                                <option className="KeeOption" value="chicken.png">Chicken</option>
                                <option className="KeeOption" value="deer.png">Deer</option>
                                <option className="KeeOption" value="fish.png">Fish</option>
                                <option className="KeeOption" value="jellyfish.png">Jellyfish</option>
                                <option className="KeeOption" value="koala.png">Koala</option>
                                <option className="KeeOption" value="monkey.png">Monkey</option>
                                <option className="KeeOption" value="penguin.png">Penguin</option>
                                <option className="KeeOption" value="sun.png">Sun</option>
                                <option className="KeeOption" value="trunk.png">Trunk</option>
                                <option className="KeeOption" value="whale.png">Whale</option>
                            </select>
                            <input className="KeeSubmit" type="submit" value="Sign up" onClick={this.submit.bind(this)} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;
