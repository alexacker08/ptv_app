import React, { Component } from 'react';
import fetchInformation from './helpers/api';
import { Link } from 'react-router-dom';
import Loader from 'react-loader';

class LineInformation extends Component {

	constructor(props){
		super(props)
		this.state = {
			stops: [],
			trainName: '',
			fetching: true
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
			this.setState({stops:data.stops,fetching:false})
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
				<Loader loaded={!this.state.fetching} top="300px" left="50%"></Loader>
				<div className="row shorten">
					<div className="columns medium-12">
						<h1>{this.state.trainName}</h1>
					</div>
				</div>
				<div className="row shorten">
				{
					stops.map((stop) => (
						<div className="columns medium-3 text-center">
							<Link to={`/departures/${routeid}/${stop.stop_id}`} key={stop.stop_id} route={routeid}>
								<div className="train-route">
									<span>{stop.stop_name}</span>
								</div>								
							</Link>
						</div>
					))		
				}
				</div>
			</div>
		)
	}
}

export default LineInformation