//import Button from './Button';
import Link from "react-router-dom/Link";
import Button from 'react-bootstrap/Button'
import {LinkContainer} from 'react-router-bootstrap'
import {useState} from 'react'
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";



function Login({login}) {

    const history = useHistory();
    const [user, setUser] = useState({username : "", password : ""});

    const submitHandler = e => {
        e.preventDefault(); 
        // login({username : "Kasper",
        // password : "123",
        // sent_req : [],
        // received_req : [],
        // friends : ["Andrei"],
        // messages : ["Hello"]})
        fetch('http://localhost:9070/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            json:true,
            body: JSON.stringify( { "username": user.username, "password" : user.password} )
        })
        .then((response) => {
            //console.log(response.text(), "hello");
            let stream = response.text();
            stream.then((res) => {
                console.log(JSON.parse(res))
                login(JSON.parse(res));
                history.push("/profile")
                //login(response)
            })
        }) 
    }

    return (
            <div>
                <form className="login" onSubmit={submitHandler} method="POST">
                    <input type="text" name="username" placeholder="Username" id="username" onChange={ e => setUser({...user, username : e.target.value})} value={user.username}></input>
                    <input type="password" name="password" placeholder="Password" id="password" onChange={ e => setUser({...user, password : e.target.value})} value={user.password}></input>
                    {/* <Link to="/profile">  <Button>Click</Button> </Link> */}
                    <input type="submit" value="Login"></input>
                </form>
                <Link to="/register">Register</Link>
            </div>
    )
}

export default Login
