import React, { Component } from 'react';
import {Button,Colors} from 'react-foundation';

class SearchInput extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: ''
		}
	}

	_handleInputChange = (evt) => {
		this.setState({value:evt.target.value})
	}

	_handleSubmit = (evt) => {
		evt.preventDefault();
	}

	render(){
		return (
			<div>
				<input type="text" value={this.state.value} onChange={this._handleInputChange} placeholder="Search" />
				<Button color={Colors.SUCCESS}>Search</Button>
			</div>
		)
	}
}

export default SearchInput