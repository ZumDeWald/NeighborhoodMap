import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';


@scriptLoader([`https://maps.googleapis.com/maps/api/js?key=AIzaSyAcGzKXNeOcVTjtGJ3mezaCbmfq3MAA3_c`])
class Map extends Component {
  constructor(props) {
    super(props);
    this.map= null;
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      //Make sure load is finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 38.7091572, lng: -90.3872404},
          zoom: 13
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: potision.coords.latitude,
              lng: potision.coords.longitude
            };

            this.map.setCenter(pos);

            const marker = new google.maps.Marker({
              position: pos,
              map: this.map,
              title: 'First Try!'
            });

          }, () => {
            console.log('Nav Disabled');
          });
        } else {
          //Browser doesn't support GeoLoc
          console.log('Nav Disabled');
        }
      }
      else this.props.onError()
    }
  }



  render() {

    return (
      <div>
        <div ref="map" style={{height: '90%', width:'100%'}}></div>
        { !this.map && <div>Loading...</div> }
      </div>
    );

  }

}

export default Map;
