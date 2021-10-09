import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import React from 'react';
import './App.css';
import { FaMapPin } from "react-icons/fa";
import { loadPartialConfig } from "@babel/core";
import SecureRoutes from "./components/SecureRoutes";
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
    isLoggedIn: false

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
        isLoggedIn: true
      })
    }
  }
  );

  function login(user_det) {
    setUser(user => user_det);

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user_det));
    setLogged(oldState => ({ ...oldState, isLoggedIn: true }))
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
          {isLoggedIn.isLoggedIn ? (
            <SecureRoutes logout={logout} user={user} update={update} />

          )
            : (
              <UnsecureRoutes login={login} />
            )
          }
        </Switch>
      </Router>

    </div>
  )
}

export default App;
