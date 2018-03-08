import React, { Component } from 'react';
import fetchInformation from './../helpers/api';
import { Link } from 'react-router-dom';
import Loader from 'react-loader';

function Trains(props){
  const routeId = props.route.route_id.toString();
  return (
    <div className="columns small-6 medium-12 text-left">
	    <Link to={`/route_id/${routeId}`}>
		    <div className="train-route">
			    <span>{props.route.route_name}</span>		    
		    </div>
	    </Link>
    </div>
  )
}

class TrainList extends Component {

	constructor(props){
		super(props)
		this.state = {
			routes: [],
			fetching: true
		}
	}

	componentWillMount(){
		this.fetchDetails();
	}

	fetchDetails = () => {
	    const baseSearch = '/v3/routes'
	    fetchInformation(baseSearch).then((data) => {	
	      this.setState({routes:data.routes,fetching:false})
	    })
	    .catch((err) => {
	      console.warn(err);
	    })		
	}

	render(){
		const trains = this.state.routes 
		console.log(trains);
		return (
		    <div className="all-trains">
		    	<Loader loaded={!this.state.fetching} top="300px" left="50%"></Loader>
		    	<div className="row shorten">
		    		<div className="columns medium-12">		              
		            	<h1>Available Train Lines</h1>
		            </div>
	          	</div>
		          <div className="row shorten">			    
			      {
			        trains.map((train) => {
			          if(train.route_type === 0){
			            return <Trains route={train} key={train.route_id} />  
			          }          
			        })
			      }
			      </div>
		    </div>
		)
	}
}

export default TrainList