import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';
import './App.css';
// import { FaMapPin } from "react-icons/fa";
// import { loadPartialConfig } from "@babel/core";
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

  function isStored() {

    return localStorage.getItem("isLoggedIn") != null;
  }

  const [isLoggedIn, setLogged] = useState(isStored());
  const [init, setInit] = useState(false);

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
          // login(JSON.parse(res));
          const json_res = JSON.parse(res);
          setUser(prevState => ({
            ...prevState,
            friends: json_res.friends,
            messages: json_res.messages,
            sent_req: json_res.sent_req,
            received_req: json_res.received_req
          }))
        })
      })
  }


  function check_user(userName, userPassword, callback) {
    fetch('http://localhost:9070/checkup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: true,
      body: JSON.stringify({ "username": userName, "password": userPassword })
    })
      .then((response) => {
        let stream = response.text();
        stream.then((res) => {
          if (res === "Unauthorized") {
            logout();
          } else if (res === "Bad Request") {
            logout();
          }
          else {
            callback();
            setUser(JSON.parse(res));
          }
        })
      })
  }

  useEffect(() => {
    const signed_in = localStorage.getItem("isLoggedIn");
    if (signed_in === 'true') {
      let stored_user = localStorage.getItem('user');
      if (stored_user != null) {
        stored_user = JSON.parse(stored_user);
        check_user(stored_user.username, stored_user.password, () => {
          setLogged(true);
          setInit(true);
        })
      }
      else {
        logout();
      }
    }
    else {
      logout();
    }
  }
    , []);


  function login(user_det) {

    setUser(user => user_det);
    localStorage.setItem('isLoggedIn', 'true');
    user_det = { username: user_det.username, password: user_det.password };
    localStorage.setItem('user', JSON.stringify(user_det));
    setLogged(true);
    setInit(true);
  }

  const logout = () => {
    setUser({
      username: "",
      password: "",
      sent_req: [],
      received_req: [],
      friends: [],
      messages: []
    });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setLogged(false);
  }

  return (
    <div className="App">
      <Router>
        {!isLoggedIn ? (
          <UnsecureRoutes login={login} />
        )
          : (
            null
          )
        }
        {isLoggedIn && init ? (
          <SecureRoutes logout={logout} user={user} update={update} />
        )
          : (
            null
          )
        }

      </Router>
    </div>
  )
}

export default App;
