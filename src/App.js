import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import CryptoJS from 'crypto-js';
import LineInformation from './LineInformation'

class App extends Component {

  constructor(){
    super()
    this.state = {
      routes: []
    }
  }

  componentWillMount(){
    this.fetchDetails()
  }

  fetchDetails = () => {
    const userId = 3000491
    const key = 'fc0ff90c-692f-485f-a69c-8b83e61c5f5c';
    const baseUrl = 'http://timetableapi.ptv.vic.gov.au';
    const req = '/v3/routes?devid=3000491';
    const baseSearch = '/v3/routes'

    const signature = this.buildSignature(baseSearch,key,userId);

    fetch(`${baseUrl}${baseSearch}?devid=${userId}&signature=${signature}`,{
      method:'GET',
    })
    .then(data => data.json())
    .then(data => {
      this.setState({routes:data.routes})
    })
    .catch(err => console.log(err))
  }

  buildSignature = (baseSearch,key,userId) => {
    const req = `${baseSearch}?devid=${userId}`;
    const encrypt = CryptoJS.HmacSHA1(req,key);
    return encrypt.toString().toUpperCase();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          {
            this.state.routes.map((route) => {
              let {route_name,route_type, route_id} = route
              if(route_type === 0){
                return  <Trains route={route} />
              }
            })
          }
          <Route path={"/:trainline"} component={LineInformation} />
        </div>

      </Router>
    );
  }
}

function Trains(props){
  return (
        <Link to={props.route.route_name} key={props.route.route_id}>
          <p>{props.route.route_name}</p>
        </Link>
  )
}

export default App;
