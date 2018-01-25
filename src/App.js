import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {Loader} from 'react-loader';
import Navbar from './components/NavBar.js';
import logo from './logo.svg';
import './App.css';
import LineInformation from './LineInformation';
import fetchInformation from './helpers/api';
import RunInformation from './RunInformation';
import TrainList from './components/TrainList';

class App extends Component {

  constructor(){
    super()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <header>
            <h1>This is your train app. Welcome</h1>
          </header>
          <Switch>
            <Route exact path="/" component={TrainList} />
            <Route path={"/route_id/:routeid"} component={LineInformation} />
            <Route path={"/departures/:routeid/:stopid"} component={RunInformation} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
