import React, { Component } from 'react'
import Button from './Button';


export class Login extends Component {
    render() {
        return (
            <div>
                <form action='#' method="post" className="login">
                    <input type="text" id="uname" placeholder="Username"></input>
                    <input type="password" id="pword" placeholder="Password"></input>
                    <Button />
                </form>
                {/* <a href="../public/register.html"></a> */}
            </div>
        )
    }
}

export default Login
