import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FilterList from './FilterList';
import Map from './Map';
import InfoWindow from './InfoWindow';
import Footer from './Footer';

import './App.css';

class App extends Component {

  state = {
    locations: [
      {title: `Blueprint`,
        location:{lat: 38.6556835, lng: -90.3027671},
        fsID: `5224911e11d21d67f10a97d0`},
      {title: `Original Kaldi's`,
        location:{lat: 38.6386208, lng: -90.3097823},
        fsID: `4acbc3faf964a520f9c520e3`},
      {title: `Hartford`,
        location:{lat: 38.6027692, lng: -90.2545727},
        fsID: `4ae473a3f964a520a99a21e3`},
      {title: `Mud House`,
        location:{lat: 38.59302865, lng: -90.22218699999999},
        fsID: `4acbc3faf964a520d7c520e3`},
      {title: `Sump`,
        location:{lat: 38.5877544, lng: -90.2283778},
        fsID: `4ef9f1ff93ad7cf2ec969baa`}
    ],
  }

  bounds = null;
  markers=[];

  setMapOnAll = (map) => {
    this.markers.forEach((marker) => {
      marker.setMap(map);
    })
  }

  filterMarker = (index) => {
    this.setMapOnAll(null);
    this.markers[index].setMap(window.mainMap);
    window.mainMap.panTo(this.markers[index].position);
  }

  showAllLocations = () => {
    this.setMapOnAll(window.mainMap);
    window.mainMap.fitBounds(this.bounds);
  }

    //On creating a map instance, add markers/infoWindows
  mapLoad = (map) => {
    //Create bounds instance
    this.bounds = new window.google.maps.LatLngBounds();
    //Loop over state and create marker info for each location
    //Then add listener for each individual marker
    this.state.locations.forEach((place, index) => {
      let position = place.location;
      let title = place.title;
      let fsID = place.fsID;
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: fsID,
        zoom: 20
      });
      //Extend boundry of map to incorporate each marker
      this.bounds.extend(marker.position);
      this.markers.push(marker);
      marker.addListener('click', () => {
        this.createInfoWindow(marker, map);
      });
    });
    //Fit map to extended bounds
    map.fitBounds(this.bounds);
  }


  createInfoWindow(e, map) {
    //save title and ID to pass to InfoWindow component
    let currentLoc = e;
    let currentID = e.id;
    //create InfoWindow instance
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div id='${currentID}' />`,
      position: e.position
    })
    //add listener to poulate infoWindow on click
    infoWindow.addListener('domready', e => {
      ReactDOM.render(<InfoWindow
        loc={currentLoc}
      />, document.getElementById(`${currentID}`))
    })
    //open infoWindow on map
    infoWindow.open(map)
  }


  render() {

    return (
      <div id="container">
        <FilterList
          locations={this.state.locations}
          onFilterMarker={this.filterMarker}
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
        <Footer />
      </div>
    );
  }

}

export default App;
