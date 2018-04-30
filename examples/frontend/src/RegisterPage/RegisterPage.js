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
            nativeLanguage: "Thai"
        }
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

    submit(event) {
        console.log(this.state);
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
                "nativeLanguage": this.state.nativeLanguage
            })
        })
            .then(response => {
                return response.json();
            }).then(body => {
                console.log(body);

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
                            <input className="KeeText" type="text" ref="username" placeholder="USERNAME" onChange={this.usernameChanged.bind(this)} />
                            Password
                            <input className="KeePass" type="password" ref="password" placeholder="PASSWORD" onChange={this.passwordChanged.bind(this)} />
                            Confirm password
                            <input className="KeePass" type="password" ref="confirmPassword" placeholder="CONFIRM PASSWORD" onChange={this.confirmPasswordChanged.bind(this)} />
                            Display name
                            <input className="KeeText" type="text" ref="displayName" placeholder="DISPLAY NAME" onChange={this.displayNameChanged.bind(this)} />
                        </div>
                            <hr />
                            <br />
                            <div className="sign" >Personal infomation</div>
                            <br />
                            <br />
                            <br />
                        <div className="Rform" >
                            First name
                            <input className="KeeText" type="text" ref="firstName" placeholder="FIRST NAME" onChange={this.firstNameChanged.bind(this)} />
                            Last name
                            <input className="KeeText" type="text" ref="lastName" placeholder="LAST NAME" onChange={this.lastNameChanged.bind(this)} />
                            Email
                            <input className="KeeMail" type="email" ref="email" placeholder="EMAIL" onChange={this.emailChanged.bind(this)} />
                            Native language
                            <select className="KeeSelect" ref="nativeLanguage" value={this.state.nativeLanguage} onchange={this.nativeLanguageChanged.bind(this)}>
                                <option className="KeeOption" value="Thai">Thai</option>
                                <option className="KeeOption" value="English">English</option>
                                <option className="KeeOption" value="Korean">Korean</option>
                                <option className="KeeOption" value="Japanese">Japanese</option>
                                <option className="KeeOption" value="Chinese">Chinese</option>
                            </select>

                            <br />
                            <br />
                            <br />

                            <input className="KeeSubmit" type="submit" value="Sign up" onClick={this.submit.bind(this)} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;
