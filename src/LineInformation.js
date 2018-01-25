import React, { Component } from 'react';
import fetchInformation from './helpers/api';
import { Link } from 'react-router-dom';

class LineInformation extends Component {

	constructor(props){
		super(props)
		this.state = {
			stops: [],
			trainName: ''
		}
	}

	componentDidMount(){
		const {routeid} = this.props.match.params
		console.log
		this.getStopInfo(routeid)
	}
	getStopInfo(id){
		const baseSearch = `/v3/stops/route/${id}/route_type/0`;
		fetchInformation(baseSearch).then((data) => {
			console.log(data)
			this.setState({stops:data.stops})
		}).then(() => {
			this.getRouteInfo(id)
		})
	}

	getRouteInfo = (id) => {
		const baseSearch = `/v3/routes/${id}`;
		fetchInformation(baseSearch).then(data => {
			this.setState({trainName:data.route.route_name})
		})
	}

	render(){	
		const {stops} = this.state
		const {routeid} = this.props.match.params
		return (
			<div className="stop-list">
				<h1>{this.state.trainName}</h1>
				{
					stops.map((stop) => (
						<Link to={`/departures/${routeid}/${stop.stop_id}`} key={stop.stop_id} route={routeid}>
							{stop.stop_name}
						</Link>
					))		
				}
			</div>
			
		)
	}
}

export default LineInformation