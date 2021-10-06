import React, { Component } from 'react'
import Button from './Button';
import Link from 'react-router-dom/Link';
import {useState} from "react";
function Register() {

    const [errorPass, setError] = useState(false);
    const [errorName, setNameError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        if (e.target[1].value === e.target[2].value && e.target[1].value.length >= 1 && e.target[0].value.length >= 1 && e.target[2].value.length >= 1 )
        {
            fetch('http://localhost:9070/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { "username": e.target[0].value, "password" : e.target[1].value} )
            })
            .then((response) => {
             
                if(response.status == 409)
                {
                    setNameError(errorName => true);
                }
                else {
                    e.target[0].value = "";
                    e.target[1].value = "";
                    e.target[2].value = "";
                }
                
                return response.status;
            })
        }
        else
        {
            setError(errorPass => true);
        }
    }

    function clearName() {
        setNameError(errorName => false);
    }
    function clearPass() {
        setError(errorPass => false);
    }

    return (
        <div>
            <form method="post" className="register" onSubmit={handleSubmit}>
                <input type="text" onInput={clearName} id="uname3" placeholder="Username"></input>
                <input type="password" id="pword1" onInput={clearPass} placeholder="Password"></input>
                <input type="password" id="pword2" placeholder="Password"></input> 
                <Button type="submit" />
            </form>

            <Link to="./login">Log in again</Link>
            {!errorPass ? (
                    null
                ) :
                (
                    <p>Passwords must match</p>
                )
            }
              {!errorName ? (
                    null
                ) :
                (
                    <p>Username is already in use</p>
                )
            }
        </div>
       )
}

export default Register
