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
import NotFriend from "./components/NotFriend"
import { useEffect } from "react";
import { FaMapPin } from "react-icons/fa";
import { loadPartialConfig } from "@babel/core";
import SecureRoutes from "./components/SecureRoutes";
import NoMatch from "./components/NoMatch"
import UnsecureRoutes from "./components/UnsecureRoutes"


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



  function update() {
    fetch('http://localhost:9070/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: true,
      body: JSON.stringify({ "username": user.username })
    })
      .then((response) => {
        let stream = response.text();

        stream.then((res) => {
          login(JSON.parse(res));
        })
      })
  }

  window.addEventListener('load', (event) => {
    const signed_in = localStorage.getItem("isLoggedIn");
    if (signed_in === 'true') {
      const user_storage = JSON.parse(localStorage.getItem('user'));

      setUser(user => user_storage)
      setLogged({
        isLoggedIn: true,
        firstLogg: true
      })
    }
  }
  );

  function login(user_det) {
    setUser(user => user_det);

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user_det));
    setLogged(oldState => ({ ...oldState, isLoggedIn: true }))
    console.log(isLoggedIn.isLoggedIn)
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

  return (
    <div className="App">

      <Router>
        <Switch>
          {!isLoggedIn.isLoggedIn ? (
            <UnsecureRoutes login={login} />
          )
            : (
              <SecureRoutes logout={logout} user={user} update={update} />
            )
          }
        </Switch>
      </Router>

    </div>
  )
}

export default App;
