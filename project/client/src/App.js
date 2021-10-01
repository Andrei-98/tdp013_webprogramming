import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import Profile from './components/Profile';



function App() {

  const all_msg = [
    {
      from: "John",
      text: "Did you know that Coca-Cola was originally green?",
      isRead: false
    },
    {
      from: "Anna",
      text: "Are you free this weekend?",
      isRead: true
    },
    {
      from: "Bear",
      text: "Somebody toucha ma spaghet! Was it you?",
      isRead: true
    }
  ]

  const all_friends = [
    {
      name: "George"
    },
    {
      name: "Bear"
    },
    {
      name: "Anna"
    }
  ]


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">  <Login /> </Route>
          <Route exact path="/register"> <Register /> </Route>
          <Route exact path="/profile"> <Profile user="John"
            all_msg={all_msg} all_friends={all_friends} /> </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
