import React, { Component } from 'react'
import Button from './Button';
import { Link } from "react-router-dom";

export class Login extends Component {
    render() {
        return (
            <div>
                <form action='#' method="post" className="login">
                    <input type="text" id="uname" placeholder="Username"></input>
                    <input type="password" id="pword" placeholder="Password"></input>
                    <Button />
                </form>
                <a><Link to="/register">  Register  </Link> </a>

            </div>
        )
    }
}

export default Login
