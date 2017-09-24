import React, { Component } from 'react';
import { getData } from '../api';
import Vehicle from './Vehicle';

export default
class VehicleList extends Component {

	constructor(props) {
		super(props);
		this.state = {
    	isError: false,
    	errMsg: '',
			cars: null
		}
	}

	// we can simulate some server errors using http://httpstat.us as the url, e.g. http://httpstat.us/500
	componentDidMount() {
		const url = 'http://localhost:9988/api/vehicle';
		getData(url).then((data) => {
			this.setState({
				isError: data['isError'],
				errMsg: data['errMsg'],
				cars: data['data']['vehicles'] // create an array from our data to map through in our render method
			})
		});
	} 

	render() {
		const cars = this.state.cars;
		// if the data fails to load we can output a user-friendly error message and/or log the real error message for investigation
		if(this.state.isError === true) {
			return (<div className="error">{`There was a problem loading the page at this time. The server returned the following error: ${this.state.errMsg}. Please try again later.`}</div>)
		}
    if(!cars) return (<div className="cars"><div className="loader">Loading</div></div>)
		return (
			<div className="cars">
				{cars.map(
      		(car, i) => <Vehicle key={i} car={car}/> 
      	)}
			</div>
		)
	}
}