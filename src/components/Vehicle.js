import React, { Component } from 'react';
import { getData } from '../api';

export default
class Vehicle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errMsg: '',
      car: null
    }
  }

  componentDidMount() {
    let url = this.props.car.url;
    getData(url).then((data) => {
      this.setState({
        isError: data['isError'],
        errMsg: data['errMsg'],
        car: data['data']
      })
    });
  }

  render() {
    const car = Object.assign({}, this.props.car, this.state.car); // add our props from parent and state to car object
    // if an individual vehicle fails to load we can handle it differently to the main vehicles list, for example, just hide that one vehicle and show the rest and/or log a console error
    if(this.state.isError === true) { 
      console.log(this.state.errMsg);
      return (null)
    }
    return (
      <a className="car" href="#">
        <div className="car__image">
          <div className="car__image-img" style={{ backgroundImage: `url(${car['media'][0]['url']})`}}></div>
        </div>
        <div className="car__details">
          <h2 className="car__title">{car['media'][0]['name']}</h2>
          <p className="car__price">From {car['price']}</p>
          <p className="car__description">{car['description']}</p>
        </div>
      </a>
    )
    // NOTE: I'm assuming the vehicle name should be populated from vehicles[].media.name rather than vehicles[].id but the returned values are all "vehicle"
    
  }
}
