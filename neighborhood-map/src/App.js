import React, { Component } from 'react';
import Map from './Map';
import InfoWindow from './InfoWindow';

import './App.css';

class App extends Component {

  createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div id='infoWindow' />`,
      position: { lat: (e.latLng.lat() + 0.001), lng: e.latLng.lng()}
    })
    infoWindow.addListener('domready', e => {
      this.render(<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  render() {
    return (
      <Map
        id='mainMap'
        options={{
          center: { lat:31.7053996 ,lng:35.1936877 },
          zoom: 13
        }}
        onMapLoad={ map => {
          let marker = new window.google.maps.Marker({
            position: { lat:31.7053996 , lng:35.1936877 },
            map: map,
            animation: window.google.maps.Animation.DROP,
            title: 'First Try!'
          });
          marker.addListener('click', e => {
            this.createInfoWindow(e, map)
          })
        }}
      />
    );
  }

}

export default App;
