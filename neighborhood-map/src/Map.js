import React, { Component } from 'react';



class Map extends Component {
  // constructor(props) {
  //   super(props);
  //   this.onScriptLoad = this.onScriptLoad.bind(this)
  // }

  //Once script load store new Google Map instance in const map
  // onScriptLoad() {
  //   const map = new window.google.maps.Map(
  //     document.getElementById(this.props.id),
  //     this.props.options);
  //   this.props.onMapLoad(map);
  // }

  componentDidMount() {
    //Check if script loading Google Maps API is already loaded
    //Make Async API call if API isn't already loaded
    if(!window.google) {
      let script = document.createElement('script');
      script.id = 'GoogleAPIScript';
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcGzKXNeOcVTjtGJ3mezaCbmfq3MAA3_c&v=3`;
      //Place our API call script on top of others
      let grabFirstScript = document.getElementsByTagName('script')[0];
      grabFirstScript.parentNode.insertBefore(script, grabFirstScript);
      //Event Listener to instantiate map after Async call returns
      script.addEventListener('load', e => {
        this.props.onScriptLoad()
      })
    } else {
      this.props.onScriptLoad()
    }
  }

  render() {
    return (
      //Return div that will be targeted by onScriptLoad to
      //populate Map once ASync call returns
      <div id={this.props.id} />
    );
  }

}

export default Map
