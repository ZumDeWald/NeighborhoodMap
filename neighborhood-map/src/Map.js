import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';


@scriptLoader([`https://maps.googleapis.com/maps/api/js?key=AIzaSyAcGzKXNeOcVTjtGJ3mezaCbmfq3MAA3_c`])
class Map extends Component {
  constructor(props) {
    super(props);
    this.map= null;
  }



  map = null;

  loadGoogleMapsAPI

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng:-73.9980244},
      zoom: 13
    });
  }



  render() {

    return (
      <div className="App">
        <div id="map"></div>
      </div>
    );

  }

}

export default Map;
