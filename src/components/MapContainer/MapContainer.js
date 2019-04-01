import React from 'react';
import './MapContainer.css';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import Geocode from 'react-geocode';

const googleApiKey = 'AIzaSyDneFI94si2xido5kCZjoGlm42q2Uhuf7s';
Geocode.setApiKey(googleApiKey);

export class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      center_location: {lat: 49.904, lng: -121.077},
      activeMarker: {},
      selectedPlace: {}
    }
    if(this.props.center_location){
      this.state.center_location = this.props.center_location;
    }
    this.props.onMount();
  }

  handleMarkerClick = (place, marker, e) => {
    this.setState({
      selectedPlace: place,
      activeMarker: marker,
    });
    console.log(place, marker, e);
    this.props.onMarkerClick(place);
  }

  renderMarkers(){
    let markers = [];
    this.props.markers.forEach((place) => {
      let position = {lat: place.lat, lng: place.lng};
      markers.push(
        <Marker key={place.id} id={place.id} position={position} data={place}
       onClick={this.handleMarkerClick} />
      );
    });
    // console.log(markers);
    return markers;
  }

  render(){
    return (
      <Map google={this.props.google}
      initialCenter={this.state.center_location}
      zoom={6}
      >
        {this.renderMarkers()}
      </Map>
      )
  }
}

export default GoogleApiWrapper({
  apiKey:(googleApiKey)
})(MapContainer)