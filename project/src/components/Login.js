import Button from 'react-bootstrap/Button'
import Link from "react-router-dom/Link";

function Login() {
    return (
            <div>
                <form action='#' method="post" className="login">
                    <input type="text" id="uname" placeholder="Username"></input>
                    <input type="password" id="pword" placeholder="Password"></input>
                    <Button variant="primary" size="lg" disabled/>
                </form>
                <Link to="/register">Register</Link>

            </div>
    )
}

export default Login
