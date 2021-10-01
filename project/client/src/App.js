import { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (

        <div className="App">
          <Router>
          <Switch>
            <Route exact path="/">  <Login/> </Route>
            <Route exact path="/register"> <Register/> </Route>
          </Switch>
          </Router>
        </div>

    );
  }


}

export default App;
