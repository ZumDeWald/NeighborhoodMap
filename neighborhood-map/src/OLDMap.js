/* OLD VERSION */

import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import InfoWindow from './InfoWindow';


class Map extends Component {

  componentWillReceiveProps ({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed) {

      const markers = [];

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.6466411, lng: -97.9536852},
        zoom: 13
      });

      const locations = [
        {title: 'Bethlehem', location:{lat: 31.7053996, lng: 35.1936877}},
        {title: 'Nazareth', location:{lat: 32.6996454, lng: 35.2908666}},
        {title: 'Capernaum', location:{lat: 32.8803473, lng: 35.5645522}},
        {title: 'Gesthsemane', location:{lat: 31.7793143, lng: 35.2375914}},
        {title: 'Church of the Holy Sepulchre', location:{lat: 31.7784858, lng: 35.2274115}},
      ]

      const infoWindow = new window.google.maps.InfoWindow({
        content: null
      });

      let bounds = new window.google.maps.LatLngBounds();

      //Loop over locations and create markers
      for (let i=0; i<locations.length; i++) {
        //get position from location array
        let position = locations[i].location;
        let title = locations[i].title;

        //create a marker per location and push to array
        let marker = new window.google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: window.google.maps.Animation.DROP,
          id: i
        });

        //push into markers array
        markers.push(marker);

        //extend bounds of map for each marker so they all appear on load
        bounds.extend(marker.position);

        //create onClick event to open InfoWindow
        marker.addListener('click', function() {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          populateInfoWindow(this, infoWindow);
        });
      }

      //fit map to bounds of all markers
      map.fitBounds(bounds);


      function populateInfoWindow(marker, infowindow) {
        //store InfoWindow Component for use later
        const InfoWindowComp = <InfoWindow />;
        //make sure infoWindow not already open
        if (infowindow.marker !== marker) {
          infowindow.marker = marker;
          infowindow.setContent(`<div>Hello</div>`);
          infowindow.open(map, marker);

          //make sure marker is cleared if infowindow is closed
          infowindow.addListener('closeclick', function() {
            infowindow.setContent(null);
            marker.setAnimation(null);
          });
        };
      }

    } else {
      //alert if the script does not load
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
