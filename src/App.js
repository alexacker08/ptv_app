import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LineInformation from './LineInformation';
import fetchInformation from './helpers/api';

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
    const baseSearch = '/v3/routes'
    fetchInformation(baseSearch).then((data) => {
      this.setState({routes:data.routes})
    })
    .catch((err) => {
      console.warn(err);
    })
  }

  render() {
    const trains = this.state.routes
    return (
      <Router>
        <div className="App">
          <header>
            <h1>This is your train app. Welcome</h1>
          </header>
          <Route exact path="/" render={(props) => (
            <HomeView routes={trains} />
          )} />
          <Route path={"/:routeid"} component={LineInformation} />
        </div>
      </Router>
    );
  }
}

function HomeView(props){
  return (
    <TrainList trains={props.routes} />
  )
}

function TrainList(props){
  const {trains} = props
  return (
    <div className="train-list">
      {
        trains.map((train) => {
          if(train.route_type === 0){
            return <Trains route={train} key={train.route_id} />  
          }          
        })
      }
    </div>
  )
}


function Trains(props){
  return (
    <Link to={props.route.route_id.toString()}>
      <p>{props.route.route_name}</p>
    </Link>
  )
}

export default App;
