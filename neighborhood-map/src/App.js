import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilterList from './FilterList';
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
      {title: 'Church of the Holy Sepulchre', location:{lat: 31.777207, lng: 35.231681}}
    ],

    showLocations: [
      {title: 'Bethlehem', location:{lat: 31.705791, lng: 35.200657}},
      {title: 'Nazareth', location:{lat: 32.6996, lng: 35.3035}},
      {title: 'Capernaum', location:{lat: 32.8803, lng: 35.5733}},
      {title: 'Gesthsemane', location:{lat: 31.779402, lng: 35.240197}},
      {title: 'Church of the Holy Sepulchre', location:{lat: 31.7784013, lng: 35.2295513}}
    ]
  }


  filterLocations = (point) => {
    this.setState({
      showLocations: ``
    });
    this.setState({
      showLocations: this.state.locations.filter((location) => location === point)
    });
    console.log(this.state.showLocations);
    this.onScriptLoad('main-map')
  }


  onScriptLoad(mapID, options) {
    const map = new window.google.maps.Map(
      document.getElementById(mapID),
      options);
      this.mapLoad(map);
  }


    //On creating a map instance, add markers/infoWindows
  mapLoad = (map) => {
    //Create bounds instance
    const bounds = new window.google.maps.LatLngBounds();
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
        id: index
      });
      //Extend boundry of map to incorporate each marker
      bounds.extend(marker.position);
      marker.addListener('click', () => {
        this.createInfoWindow(marker, map);
      });
    });
    //Fit map to extended bounds
    map.fitBounds(bounds);
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
          onFilterLocations={this.filterLocations}
         />
        <Map
          onScriptLoad={() => this.onScriptLoad('main-map',
          {center: { lat:31.7053996 ,lng:35.1936877 },
            zoom: 20}
        )}
          id='main-map'
          // options={{
          //   center: { lat:31.7053996 ,lng:35.1936877 },
          //   zoom: 20
          // }}
          // onMapLoad={ this.mapLoad }
        />
      </div>
    );
  }

}

export default App;
