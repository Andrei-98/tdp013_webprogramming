//import React, { Component } from 'react'
import Button from './Button';
import Link from 'react-router-dom/Link';
import {useState} from "react";
function Register() {

    const [error, setError] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        if (e.target[1].value === e.target[2].value && e.target[1].value.length >= 1 && e.target[0].value.length >= 1 && e.target[2].value.length >= 1 )
        {
            console.log("1 val")
            console.log(e.target[1].value)
            fetch('http://localhost:9070/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { "username": e.target[0].value, "password" : e.target[1].value} )
            })
            .then((response) => {
             
                if(response.status === 409)
                {
                    setError("Username is already in use.")
                } else if (response.status === 400) {
                    setError("Forbidden characters detected, your input is either ${} or a JSON string.")
                }
                 else {
                    e.target[0].value = "";
                    e.target[1].value = "";
                    e.target[2].value = "";
                }
                
                return response.status;
            })
        } else
        {
            setError("Passwords must match and they cannot be empty.")
        }
    }

    const resetError = () => {setError(error => "")}

    return (
        <div>
            <form method="post" className="register" onSubmit={handleSubmit}>
                <input type="text" onInput={resetError} id="uname3" placeholder="Username"></input>
                <input type="password" id="pword1" onInput={resetError} placeholder="Password"></input>
                <input type="password" id="pword2" onInput={resetError} placeholder="Password"></input> 
                <Button type="submit" />
            </form>

            <Link to="./login">Log in again</Link>
            <span>{error}</span>
        </div>
       )
}

export default Register
