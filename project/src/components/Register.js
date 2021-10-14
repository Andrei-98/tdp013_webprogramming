import { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import verifyMessage from '../validation'
import CryptoJS from "crypto-js";


function Register() {

    const [error, setError] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        // check if the passwords match
        // check if username and passwords have one or more chars
        if (e.target[1].value === e.target[2].value &&
            e.target[1].value.length >= 1 &&
            e.target[0].value.length >= 1) {

            let status_username = verifyMessage(e.target[0].value)
            let status_pass1 = verifyMessage(e.target[1].value)

            if (status_username === "" &&
                status_pass1 === "" ) {
                const hashedPassword = CryptoJS.SHA512(e.target[1].value).toString();
                const hashedPasswordConfirm = CryptoJS.SHA512(e.target[2].value).toString();

                fetch('http://localhost:9070/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "username": e.target[0].value, "password": hashedPassword, "password_confirm" : hashedPasswordConfirm })
                })
                    .then((response) => {

                        if (response.status === 409) {
                            setError("Username is already in use.")
                        } else if (response.status === 400) {
                            setError("Forbidden characters detected, your input is either ${} or a JSON string.")
                            // } else if (response.status === 200) {
                            //     setError("Account created successfully.")
                        } else {
                            setError("Account created successfully.")
                            e.target[0].value = "";
                            e.target[1].value = "";
                            e.target[2].value = "";
                        }

                        return response.status;
                    })
            } else {
                if (status_username !== "") {
                    setError(status_username)
                }  else {
                    setError(status_pass1)
                }

            }

        } else {
            setError("Passwords and username must match and they cannot be empty.")
        }
    }

    const resetError = () => { setError(error => "") }

    return (
        <div className="login-form background">
            <div className="login-border">
                <h3>Register</h3>

                <Form className="login" onSubmit={handleSubmit} method="POST">
                    <Form.Group className="mb-3 login">
                        <Form.Control
                            type="text"
                            name="username"
                            onInput={resetError}
                            placeholder="Username"
                            id="uname3"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            name="password"
                            onInput={resetError}
                            placeholder="Password"
                            id="pword1"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            name="password"
                            onInput={resetError}
                            placeholder="Password"
                            id="pword2"
                        />
                    </Form.Group>
                    <p>{error}</p>

                    <Button variant="primary" type="submit">Register</Button>{' '}
                </Form>
                <a href="/login">Log in again</a>
            </div>
        </div>
    )
}

export default Register
