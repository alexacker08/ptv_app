import React, { Component } from 'react';


class LineInformation extends Component {

	constructor(props){
		super(props)
		this.state = {
			route: null
		}
	}

	componentDidMount(){
		const {trainline} = this.props.match.params
		this.setState({route:trainline})
	}

	render(){
		console.log(this.props)
		return (
			<h3>{this.state.route}</h3>
		)
	}
}

export default LineInformation