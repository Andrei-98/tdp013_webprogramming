import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import Profile from './components/Profile';
import Navigation from './components/Navigation'
import { Redirect } from "react-router";
import { useEffect } from "react";
import { FaWindowRestore } from "react-icons/fa";



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
  // useEffect(() => {
  //   localStorage.setItem('isLoggedIn', 'false')
  // }, [])

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem('isLoggedIn');
  //   if (loggedIn == "false")
  //   {
  //     localStorage.setItem('isLoggedIn', 'true')
  //   }
  // }, [user.username])

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


    //console.log(user);
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

  console.log(isLoggedIn.isLoggedIn);
  console.log(user);

  // const [all_msg, setMsg] = useState([
  //   {
  //     id: 1,
  //     from: "John",
  //     text: "Did you know that Coca-Cola was originally green?",
  //     isRead: false
  //   },
  //   {
  //     id: 2,
  //     from: "Anna",
  //     text: "Are you free this weekend?",
  //     isRead: true
  //   },
  //   {
  //     id: 3,
  //     from: "Bear",
  //     text: "Somebody toucha ma spaghet! Was it you?",
  //     isRead: true
  //   }
  // ])

  // const [all_friends, setFriends] = useState([
  //   {
  //     name: "George"
  //   },
  //   {
  //     name: "Bear"
  //   },
  //   {
  //     name: "Anna"
  //   }
  // ])

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
          <Route exact path="/login">
          {isLoggedIn.isLoggedIn ? (
            <Redirect to="/profile"> </Redirect>
          )
          : (
              <Login login={login}/>
            )
          }  
          </Route>
          <Route exact path="/profile"> <Profile user={user} logout={logout} /> </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default App;
