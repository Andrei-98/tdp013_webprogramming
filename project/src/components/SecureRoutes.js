import { React } from 'react'
import { Redirect } from 'react-router'
import Navigation from './Navigation'
import Find from './Find'
import Profile from './Profile'
import NoMatch from './NoMatch'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function SecureRoutes({ logout, user, update }) {
    return (

        <div>

            <Router>
                <Navigation logout={logout} username={user.username} />
                <Switch>
                    <Route exact path="/find">
                        <Find
                            user={user}
                            update={update}
                            username={user.username}
                        />
                    </Route>

                    <Route exact path="/profile/:username">
                        <Profile
                            from={user.username}
                            user={user}
                            update={update}
                            showRequests={true}
                        />
                    </Route>

                    <Route exact path={
                        ["/", "/profile", "/profile/", "/login", "/register"]}>
                        <Redirect to={"/profile/" + user.username}></Redirect>
                    </Route>
                    
                    <Route exact path="*"><NoMatch /></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default SecureRoutes

