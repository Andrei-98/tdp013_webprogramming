import React, { Component } from 'react'
import Button from './Button';


export class Login extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     username: '',
        //     password: ''
        // }

        // this.updateInput = this.updateInput.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // updateInput(event) {
    //     this.setState({ username: event.target.value, password: event.target.value })
    // }

    handleSubmit(event) {
        event.preventDefault();
        // console.log('Your input value is: ' + this.state.username)
        // console.log(event.target[0].value)
        // console.log(event.target[1].value)
        // console.log(event.target.elements.username.value)
        // console.log(event.target.username.value)
        // console.log(this.inputNode.value)

        fetch('http://localhost:9070/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { "username": event.target[0].value, "password" : event.target[1].value} )
        })
        .then((response) => {
            return response.status;
        })
    }

    render() {
        return (
            <form method="post" className="login" onSubmit={this.handleSubmit}>
                <input type="text" id="uname3" onChange={this.updateInput} placeholder="Username"></input>
                <input type="password" id="pword1" onChange={this.updateInput} placeholder="Password"></input>
                 <input type="password" id="pword2" placeholder="Password"></input> 
                <Button type="submit" />
            </form>

       )
    }
}

export default Login
