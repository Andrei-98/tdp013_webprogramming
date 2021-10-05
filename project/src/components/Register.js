import React, { Component } from 'react'
import Button from './Button';
import Link from 'react-router-dom/Link';

function Register() {

    const handleSubmit = e => {
        e.preventDefault();

        if (e.target[1].value === e.target[2].value)
        {
            fetch('http://localhost:9070/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { "username": e.target[0].value, "password" : e.target[1].value} )
            })
            .then((response) => {
                e.target[0].value = "";
                e.target[1].value = "";
                e.target[2].value = "";
                return response.status;
            })
        }
        else
        {
            console.log("Passwords must match")
        }
    }

    return (
        <div>
            <form method="post" className="register" onSubmit={handleSubmit}>
                <input type="text" id="uname3" placeholder="Username"></input>
                <input type="password" id="pword1" placeholder="Password"></input>
                <input type="password" id="pword2" placeholder="Password"></input> 
                <Button type="submit" />
            </form>

            <Link to="./login">Log in again</Link>
        </div>
       )
}

export default Register
