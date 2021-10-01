import React, { Component } from 'react'
import Button from './Button';


export class Login extends Component {
    render() {
        return (
            <div>
                <form action='#' method="post" className="login">
                    <input type="text" id="uname3" placeholder="Username"></input>
                    <input type="password" id="pword1" placeholder="Password"></input>
                    <input type="password" id="pword2" placeholder="Password"></input>

                    <Button />
                </form>
            </div>
        )
    }
}

export default Login
