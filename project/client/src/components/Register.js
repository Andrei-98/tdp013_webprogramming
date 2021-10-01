import Button from './Button';


function Register() {
    return (
        <div>
            <div>
                <form action='#' method="post" className="login">
                    <input type="text" id="uname3" placeholder="Username"></input>
                    <input type="password" id="pword1" placeholder="Password"></input>
                    <input type="password" id="pword2" placeholder="Password"></input>

                    <Button />
                </form>
            </div>           
        </div>
    )
}

export default Register
