import React, { Component } from 'react';
import './LoginPage.css';

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
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

    submit(event) {
        console.log(this.state);
        fetch('/login/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            })
        })
            .then(function (response) {
                return response.text()
            }).then(function (body) {

            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="LoginPage">
                <div className="LoginImage"></div>
                <div className="LoginTitle">TALKNATIVE</div>
                <div className="LoginPanel">
                    <form>
                        <input type="text" ref="username" placeholder="USERNAME" onChange={this.usernameChanged.bind(this)} />
                        <input type="text" ref="password" placeholder="PASSWORD" onChange={this.passwordChanged.bind(this)} />
                        <input type="submit" value="SUBMIT" onClick={this.submit.bind(this)} />
                    </form>
                    <a href="/">Sign up</a>
                </div>
            </div>
        );
    }
}

export default LoginPage;
