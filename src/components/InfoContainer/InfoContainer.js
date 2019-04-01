import React from 'react';
import './InfoContainer.css';
import Geocode from 'react-geocode';
import Moment from 'react-moment';

const googleApiKey = 'AIzaSyDneFI94si2xido5kCZjoGlm42q2Uhuf7s';
Geocode.setApiKey(googleApiKey);

export default class InfoContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nodeId: '',
      position: {lat: null, lng: null},
      location: '',
      data: {
        temperature: null,
        temperature_analog: null,
        pressure: null,
        humidity: null,
        eco2: null,
        tvoc: null,
        lightning_distance: null,
        created_at: null
      }
    }
  }
  getLocationName = (position) => {
    Geocode.fromLatLng(position.lat, position.lng).then(
        response => {
          const address = response.results[10].formatted_address;
          // console.log(response);
          this.setState({location: address});
        },
        error => {
          console.log(error)
        }
      )
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.nodeId !== this.props.nodeId) {
      this.props.onMount();
      this.setState({
        nodeId: this.props.nodeId,
        position: this.props.nodePosition,
        data: {
          temperature: null,
          temperature_analog: null,
          pressure: null,
          humidity: null,
          eco2: null,
          tvoc: null,
          lightning_distance: null,
          created_at: null
        }
      })
      this.getLocationName(this.props.nodePosition);
    }
    if (prevProps.nodeData !== this.props.nodeData){
      this.setState({
        data: this.props.nodeData
      })
    }
  }

  render(){
    let created_at, temperature, temperature_analog, pressure, humidity, eco2, tvoc, lightning_distance;
    if(this.state.data.created_at){
      created_at = <p>Last Updated:  <Moment>{this.state.data.created_at}</Moment></p>;
    }
    if(this.state.data.temperature){
      temperature = <p>Temperature: {this.state.data.temperature}&deg;C</p>;
    }
    if(this.state.data.temperature_analog){
      temperature_analog = <p>Temperature Analog: {this.state.data.temperature_analog}&deg;C</p>;
    }
    if(this.state.data.pressure){
      pressure = <p>Pressure: {this.state.data.pressure} hPa</p>;
    }
    if(this.state.data.humidity){
      humidity = <p>Humidity: {this.state.data.humidity}%</p>;
    }
    if(this.state.data.eco2){
      eco2 = <p>eCO2: {this.state.data.eco2} ppm</p>;
    }
    if(this.state.data.tvoc){
      tvoc = <p>TVOC: {this.state.data.tvoc} ppb</p>;
    }
    if(this.state.data.lightning_distance){
      lightning_distance = <p>Lightning Distance: {this.state.data.lightning_distance}m</p>;
    }
    return (
      <div className="info-container">
        <p>{this.state.location}</p>
        <p>Lat: {this.state.position.lat}</p>
        <p>Lng: {this.state.position.lng}</p>
        <h5>Current Data</h5>
          {created_at}
          {temperature}
          {temperature_analog}
          {pressure}
          {humidity}
          {eco2}
          {tvoc}
          {lightning_distance}
      </div>
      )
  }
}