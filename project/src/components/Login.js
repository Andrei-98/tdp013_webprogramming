import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useHistory } from "react-router-dom";


function Login({ login }) {

    const history = useHistory()
    const [user, setUser] = useState({ username: "", password: "" })
    const [error, setError] = useState(false)

    const submitHandler = e => {
        e.preventDefault();

        fetch('http://localhost:9070/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            json: true,
            body: JSON.stringify({ "username": user.username, "password": user.password })
        })
            .then((response) => {
                let stream = response.text();
                stream.then((res) => {
                    if (res === "Unauthorized") {
                        setError("Wrong password or name.")
                        return;
                    } else if (res === "Bad Request") {

                        setError("Forbidden characters detected, your input is either ${} or a JSON string.")
                    }
                    else {
                        login(JSON.parse(res));
                        history.push("/profile/" + user.username)
                    }
                })
            })
    }
    function clearError() {
        setError("")
    }

    return (
        <div className="login-form background">
            <div className="login-border">
                <h3>Log in</h3>

                <Form className="login" onSubmit={submitHandler} method="POST">
                    <Form.Group className="mb-3 login">
                        <Form.Control
                            type="text"
                            name="username"
                            onInput={clearError}
                            placeholder="Username"
                            id="username"
                            onChange={e => setUser({ ...user, username: e.target.value })}
                            value={user.username}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            name="password"
                            onInput={clearError}
                            placeholder="Password"
                            id="password"
                            onChange={e => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                        />
                    </Form.Group>
                    <p>{error}</p>

                    <Button variant="primary" type="submit">Login</Button>{' '}
                </Form>
                <a href="/register">Register</a>
            </div>
        </div>

    )
}

export default Login
