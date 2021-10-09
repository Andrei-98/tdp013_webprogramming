import {React} from 'react'
import NoMatch from './NoMatch'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './Register';
import Login from './Login';

function UnsecureRoutes({ login }) {

    
    return (
        <div> 
            <Switch>
                <Route exact path="/register"> <Register /> </Route>
                <Route exact path={["/","/login"]}> <Login login={login} /> </Route>
                <Route exact path='*' ><NoMatch msg={"409 : Unauthorized"} /> </Route>
            </Switch>
        </div>
    )
}

export default UnsecureRoutes;

