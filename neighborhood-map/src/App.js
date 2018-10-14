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
      {title: 'Church of the Holy Sepulchre', location:{lat: 31.777207, lng: 35.231681}},
    ],
  }

  filterLocations (point) {
    const updatedLocation = this.state.locations.filter(location => location === point);
    this.setState({ locations: updatedLocation });
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

    let markers = [];
    const locations = this.state.locations;

    return (
      <div id="map-container">
        <FilterList />
        <Map
          id='main-map'
          options={{
            center: { lat:31.7053996 ,lng:35.1936877 },
            zoom: 13
          }}

        //On creating a map instance, add markers/infoWindows
        //This setup allows for multiple Maps to be loaded
        //independently inside the same main App if desired
          onMapLoad={ map => {
            //Create bounds instance
            const bounds = new window.google.maps.LatLngBounds();

            //Loop over state and create marker info for each
            //location and push into new array
            //Then add listener for each individual marker
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
              //Add marker to new array
              markers.push(marker);
              //Extend boundry of map to incorporate each marker
              bounds.extend(marker.position);
              marker.addListener('click', () => {
                this.createInfoWindow(marker, map);
              });
            });
            //Fit map to extended bounds
            map.fitBounds(bounds);
          }}
        />
      </div>
    );
  }

}

export default App;
