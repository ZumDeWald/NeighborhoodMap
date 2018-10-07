import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';


class Map extends Component {

  componentWillReceiveProps ({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed) {

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.7091572, lng: -90.3872404},
        zoom: 13
      });

      const locations = [
        {title: 'location1', location:{lat: 34.6446582, lng: -97.930316}},
        {title: 'location2', location:{lat: 34.6505821, lng: -97.9580572}},
        {title: 'location3', location:{lat: 34.6454464, lng: -97.9676083}},
        {title: 'location4', location:{lat: 34.6466411, lng: -97.9536852}},
        {title: 'location5', location:{lat: 34.6667351, lng: -97.9548392}},
      ]

      let newPoint = {lat: 38.7048806, lng:-90.355353};
      let marker = new window.google.maps.Marker({
        position: newPoint,
        map: map,
        title: 'NumberOne'
      });

      let infoWindow = new window.google.maps.InfoWindow({
        content: `I am telling you the INFO`
      });
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

    } else {
      alert('No Script Loaded')
    }
  }

  render() {

    return (
      <div classID="mapContainer">
        <div id='map'></div>
      </div>
    );

  }

}

  //ScriptLoader used to Async load Google Maps API
export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=AIzaSyAcGzKXNeOcVTjtGJ3mezaCbmfq3MAA3_c&v=3`]
) (Map)
