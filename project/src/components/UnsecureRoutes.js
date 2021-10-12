import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import { Redirect } from 'react-router';


function UnsecureRoutes({ login }) {

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/register"> <Register /> </Route>
                    <Route exact path={["/", "/login"]}> <Login login={login} /> </Route>
                    <Route exact path='*' ><Redirect exact to="/login" ></Redirect> </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default UnsecureRoutes;

