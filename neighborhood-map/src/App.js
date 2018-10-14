import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import InfoWindow from './InfoWindow';

import './App.css';

class App extends Component {

  state = {
    locations: [
      {title: 'Bethlehem', location:{lat: 31.7053996, lng: 35.1936877}},
      {title: 'Nazareth', location:{lat: 32.6996454, lng: 35.2908666}},
      {title: 'Capernaum', location:{lat: 32.8803473, lng: 35.5645522}},
      {title: 'Gesthsemane', location:{lat: 31.7793143, lng: 35.2375914}},
      {title: 'Church of the Holy Sepulchre', location:{lat: 31.777207, lng: 35.231681}},
    ],
  }

  createInfoWindow(e, map) {
    //save title to pass to InfoWindow component
    let currentTitle = e.title;
    let currentID = e.id;

    //create InfoWindow instance
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div id='${currentID}' />`,
      position: e.position
    })

    //add listener to poulate infoWindow on click
    infoWindow.addListener('domready', e => {
      ReactDOM.render(<InfoWindow
        title={currentTitle}
      />, document.getElementById(`${currentID}`))
    })

    //open infoWindow on map
    infoWindow.open(map)
  }

  render() {
    let markers = [];
    const locations = this.state.locations;

    return (
      <Map
        id='main-map'
        options={{
          center: { lat:31.7053996 ,lng:35.1936877 },
          zoom: 13
        }}
        onMapLoad={ map => {
          locations.forEach((place, index) => {
            let position = place.location;
            let title = place.title;
            let marker = new window.google.maps.Marker({
              map: map,
              position: position,
              title: title,
              animation: window.google.maps.Animation.DROP,
              id: index
            });
            markers.push(marker);
            marker.addListener('click', () => {
              this.createInfoWindow(marker, map);
            });
          });
        }}
      />
    );
  }

}

export default App;
