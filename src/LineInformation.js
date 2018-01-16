import React, { Component } from 'react';
import fetchInformation from './helpers/api';


class LineInformation extends Component {

	constructor(props){
		super(props)
		this.state = {
			stops: null
		}
	}

	componentDidMount(){
		const {routeid} = this.props.match.params
		this.getRouteInfo(routeid)
	}
	getRouteInfo(id){
		const baseSearch = `/v3/stops/route/${id}/route_type/0`;
		fetchInformation(baseSearch).then((data) => {
			this.setState({stops:data.stops})
		})
	}

	render(){
		console.log(this.props)
		return (
			<h3>{this.state.route}</h3>
		)
	}
}

export default LineInformation