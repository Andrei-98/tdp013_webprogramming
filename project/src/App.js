import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import Profile from './components/Profile';
import Navigation from './components/Navigation'
import { Redirect } from "react-router";
import Find from "./components/Find"
import OtherProfile from "./components/OtherProfile"

function App() {

  const [user, setUser] = useState(
    {
      username: "",
      password: "",
      sent_req: [],
      received_req: [],
      friends: [],
      messages: []
    }
  )

  const [isLoggedIn, setLogged] = useState({
    isLoggedIn: false,
    firstLogg: null
  });

  window.addEventListener('load', (event) => {
    const signed_in = localStorage.getItem("isLoggedIn");
    if (signed_in == 'true') {
      const user_storage = JSON.parse(localStorage.getItem('user'));

      setUser({
        username: user_storage.username,
        sent_req: user_storage.sent_req,
        received_req: user_storage.received_req,
        friends: user_storage.friends,
        messages: user_storage.messages
      })
      setLogged({
        isLoggedIn: true,
        firstLogg: true
      })
    }
  }
  );

  const login = user_det => {
    setUser({
      username: user_det.username,
      sent_req: user_det.sent_req,
      received_req: user_det.received_req,
      friends: user_det.friends,
      messages: user_det.messages
    });

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user_det));
    setLogged({
      isLoggedIn: true,
      firstLogg: true
    })
  }

  const logout = () => {
    setUser({
      username: "",
      sent_req: [],
      received_req: [],
      friends: [],
      messages: []
    });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setLogged({
      isLoggedIn: false
    })
  }
  
  // const deleteFriend = (name) => {
  //   setFriends(all_friends.filter((friend) => friend.name != name))
  //   // should be able to send something to the server here and delete from db also
  // }

  return (
    <div className="App">

      <Router>
        {isLoggedIn.isLoggedIn ? (
          <Navigation logout={logout} />
        )
          : (
            null
          )
        }
        <Switch>
          <Route exact path="/register"> <Register /> </Route>
          <Route exact path="/find"> <Find user={user} /> </Route>
          <Route exact path="/profile/:username" > <OtherProfile /> </Route> 
          <Route exact path="/login">
            {isLoggedIn.isLoggedIn ? (
              <Redirect to="/profile"> </Redirect>
            )
              : (
                <Login login={login} />
              )
            }
          </Route>
          <Route exact path="/profile"> <Profile user={user} logout={logout} /> </Route>
          <Route exact path="/">
            {isLoggedIn.isLoggedIn ? (
              <Redirect to="/profile"> </Redirect>
            )
              : (
                <Redirect to="/login"> </Redirect>
              )
            }
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default App;
