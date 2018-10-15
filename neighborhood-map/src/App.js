import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilterList from './FilterList';
import Map from './Map';
import InfoWindow from './InfoWindow';

import './App.css';

class App extends Component {

  state = {
    locations: [
      {title: 'Bethlehem', location:{lat: 31.705791, lng: 35.200657}},
      {title: 'Nazareth', location:{lat: 32.6996, lng: 35.3035}},
      {title: 'Capernaum', location:{lat: 32.8803, lng: 35.5733}},
      {title: 'Gesthsemane', location:{lat: 31.779402, lng: 35.240197}},
      {title: 'Church of the Holy Sepulchre', location:{lat: 31.7784013, lng: 35.2295513}}
    ],
    showLocations: [
      {title: 'Bethlehem', location:{lat: 31.705791, lng: 35.200657}},
      {title: 'Nazareth', location:{lat: 32.6996, lng: 35.3035}},
      {title: 'Capernaum', location:{lat: 32.8803, lng: 35.5733}},
      {title: 'Gesthsemane', location:{lat: 31.779402, lng: 35.240197}},
      {title: 'Church of the Holy Sepulchre', location:{lat: 31.7784013, lng: 35.2295513}}
    ]
  }

  bounds = null;


  centerLocation = (point) => {
    window.mainMap.setZoom(12)
    window.mainMap.panTo(point.location);
  }

  showAllLocations = () => {
    window.mainMap.fitBounds(this.bounds);
  }

  //
  // onScriptLoad(mapID, options) {
  //   const map = new window.google.maps.Map(
  //     document.getElementById(mapID),
  //     options);
  //     this.mapLoad(map);
  // }


    //On creating a map instance, add markers/infoWindows
  mapLoad = (map) => {
    //Create bounds instance
    this.bounds = new window.google.maps.LatLngBounds();
    //Loop over state and create marker info for each location
    //Then add listener for each individual marker
    this.state.showLocations.forEach((place, index) => {
      let position = place.location;
      let title = place.title;
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: index,
        zoom: 20
      });
      //Extend boundry of map to incorporate each marker
      this.bounds.extend(marker.position);
      marker.addListener('click', () => {
        this.createInfoWindow(marker, map);
      });
    });
    //Fit map to extended bounds
    map.fitBounds(this.bounds);
  }


  createInfoWindow(e, map) {
    //save title and ID to pass to InfoWindow component
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

    return (
      <div id="map-container">
        <FilterList
          locations={this.state.locations}
          onCenterLocation={this.centerLocation}
          showAllLocations={this.showAllLocations}
         />
        <Map
          id='main-map'
          options={{
            center: { lat:31.7053996 ,lng:35.1936877 },
            zoom: 20
          }}
          onMapLoad={ this.mapLoad }
        />
      </div>
    );
  }

}

export default App;
