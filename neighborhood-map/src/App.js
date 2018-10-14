import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import InfoWindow from './InfoWindow';

import './App.css';

class App extends Component {

  state = {
    markers: [
      {title: 'Bethlehem', location:{lat: 31.7053996, lng: 35.1936877}},
      {title: 'Nazareth', location:{lat: 32.6996454, lng: 35.2908666}},
      {title: 'Capernaum', location:{lat: 32.8803473, lng: 35.5645522}},
      {title: 'Gesthsemane', location:{lat: 31.7793143, lng: 35.2375914}},
      {title: 'Church of the Holy Sepulchre', location:{lat: 31.7784858, lng: 35.2274115}},
    ],
  }

  createMarker(marker, map) {
    let currentMarker = new window.google.maps.Marker({
      position: { lat: marker.location.lat,
                  lng: marker.location.lng},
      map: map,
      animation: window.google.maps.Animation.DROP,
      title: marker.title
    });
    currentMarker.addListener('click', e => {
      this.createInfoWindow(marker, map)
    })
  }

  createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div id='infoWindow' />`,
      position: { lat: e.latLng.lat(), lng: e.latLng.lng()}
    })
    infoWindow.addListener('domready', e => {
      ReactDOM.render(<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  render() {
    const markerList = this.state.markers;
    const componentTHIS = this;
    return (
      <Map
        id='main-map'
        options={{
          center: { lat:31.7053996 ,lng:35.1936877 },
          zoom: 13
        }}
        onMapLoad={ map => {
          markerList.forEach( function(currentMarker) {
                componentTHIS.createMarker(currentMarker, map)
            }
          )
        }}
      />
    );
  }

}

export default App;
