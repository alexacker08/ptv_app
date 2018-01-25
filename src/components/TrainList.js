import React, { Component } from 'react';
import fetchInformation from './../helpers/api';
import { Link } from 'react-router-dom';

function Trains(props){
  const routeId = props.route.route_id.toString();
  return (
    <div className="train-listing">
	    <Link to={`/route_id/${routeId}`}>
	      <p>{props.route.route_name}</p>
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
		return(
		    <div className="row">
			    <div className="train-list">
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