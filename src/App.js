import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Navbar from './components/NavBar.js';
import logo from './logo.svg';
import './App.css';
import {createLocal} from './helpers/localapi.js';
import LineInformation from './LineInformation';
import RunInformation from './RunInformation';
import TrainList from './components/TrainList';
import SearchInput from './components/SearchInput';

class App extends Component {

  constructor(){
    super()
  }

  componentWillMount(){
    createLocal();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="left-nav-column">
            <Navbar />
          </div>
          <div className="right-app-content">
            <div className="buffer"></div>
            <div className="top-nav-container">
              <div className="row">
                <div className="columns medium-12">
                  <div className="search-container float-right clearfix">
                    <SearchInput/>
                  </div>
                </div>                
              </div>
            </div>
            <Switch>
              <Route exact path="/" component={TrainList} />
              <Route path={"/route_id/:routeid"} component={LineInformation} />
              <Route path={"/departures/:routeid/:stopid"} component={RunInformation} />
              <Route exact path={"/all-trains"} component={TrainList} />
            </Switch>
            <footer>              
            </footer>            
          </div>          
        </div>
      </Router>
    );
  }
}

export default App;
