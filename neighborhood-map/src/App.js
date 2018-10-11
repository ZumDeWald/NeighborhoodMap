import React, { Component } from 'react';
import Map from './Map';

import './App.css';

class App extends Component {

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
            title: 'First Try!'
          });
        }}
      />
    );
  }

}

export default App;
