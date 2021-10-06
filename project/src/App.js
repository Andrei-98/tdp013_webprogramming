import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import Profile from './components/Profile';
import Navigation from './components/Navigation'
import { Redirect } from "react-router";

function App() {

  const [user, setUser] = useState(
    {
      username : "",
      password : "",
      sent_req : [],
      received_req : [],
      friends : [],
      messages : []
    }
  )

  const login = user_det => {
    setUser( {
      username : user_det.username,
      password : user_det.password,
      sent_req : user_det.sent_req,
      received_req : user_det.received_req,
      friends : user_det.friends,
      messages : user_det.messages
    });

    //console.log(user);
  }

  const logout = () => {
    setUser({
      username : "",
      password : "",
      sent_req : [],
      received_req : [],
      friends : [],
      messages : []
    });
  }

  const isLoggedIn = user.username != "";
  console.log(isLoggedIn);



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
      <Navigation />

        <Switch>
          <Route exact path="/">  <Login login={login}/> </Route>
          <Route exact path="/register"> <Register /> </Route>
           <Route exact path="/profile"> <Profile user="John" /> </Route>
           {/* user="John"
            all_msg={all_msg} all_friends={all_friends} onDelete={ deleteFriend }/ */}
        </Switch>
        {isLoggedIn ? ( 
          //console.log(user)

        <Redirect to="/profile"> <Profile user="John" /></Redirect>
      ) : (
        console.log("not signed in")
      )}
      </Router>

     

      </div>
  )
}

export default App;
