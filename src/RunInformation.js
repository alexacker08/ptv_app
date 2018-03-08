import React, { Component } from 'react';
import fetchInformation from './helpers/api';
import Loader from 'react-loader';


class RunInformation extends Component {

	constructor(props){
		super(props)
		this.state = {
			next: {},
			fetching: true
		}
		this.getDepatureInfo.bind(this)
	}

	componentDidMount(){
		const {stopid} = this.props.match.params
		this.getDepatureInfo(stopid)
	}

	getDepatureInfo(id){
		const {routeid,stopid} = this.props.match.params;
		const baseSearch = `/v3/departures/route_type/0/stop/${stopid}`;
		const dirSearch = `/v3/directions/route/${routeid}`;

		fetchInformation(baseSearch).then((res) => {
			console.log(res)
			const now = new Date();
			
			//Return Departures that are after NOW and match the RouteId
			const depTimes = res.departures.reduce((agg,dep) => {				
				let date = new Date(dep.scheduled_departure_utc);
				if(date >= now){
					agg.push(dep);
				}
				return agg;
			},[]).filter((deps) => {
				return deps.route_id == routeid
			});

			const nextTen = depTimes.slice(0,10);

			fetchInformation(dirSearch).then((data) => {
				//Build new dest object that will be added to state
				const destObj = data.directions.reduce((agg,dest) => {
					let destName = dest.direction_name;
					let destId = dest.direction_id;
					agg[destId] = {
						name: destName,
						next:[]
					}
					return agg
				},{})
				//Convert departure times into minutes and add too appropriate pre state object
				const nextTenTimes = nextTen.map((dep) => {
					let depDir = dep.direction_id				
					let time = new Date(dep.scheduled_departure_utc);
					let millitoMin = 1000 * 60;
					let minutesLeft = ((time.getTime() - now.getTime()) / millitoMin)
					if(minutesLeft === 0){
						destObj[depDir].next.push('Departing Now')
						return 'Departing Now';
					} else {
						destObj[depDir].next.push(Math.round(minutesLeft))
						return Math.round
					}
				})
				//Sets the state with new destination and next times Object
				this.setState({next:destObj,fetching:false})				
			}).catch(err => console.warn(err))
		}).catch(err => console.warn(err))
	}

	render(){
		const nextTimes = Object.keys(this.state.next)
		const {next} = this.state
		return (
			<div className="train-timer-holder">
				<Loader loaded={!this.state.fetching} top="300px" left="50%"></Loader>
				<div className="row shorten	">
					<div className="columns medium-12">
						<h1 className="text-left">Upcoming Departures</h1>
					</div>
				</div>
				<div className="row shorten">
					{
						nextTimes.map((id) => {
							return <TrainTimes key={id} direction={next[id].name} times={next[id].next} />					
						})
					}
				</div>
			</div>		
		)
	}
}

function TrainTimes(props){
	return (
		<div className="columns medium-6 train-times">
			<h3><em>Towards</em> {props.direction}</h3>
			{
				props.times.map((time) => {
					return <p key={time}>{time} minutes until departure</p>
				})
			}
		</div>
	)
}

export default RunInformation