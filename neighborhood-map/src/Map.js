import React, { Component } from 'react';



class Map extends Component {
  //Bind "this" keyword within onScriptLoad
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  // Once script loads store new Google Map instance in const map
  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    //set map to window obj to get global access
    window.mainMap = map;
    //Call method creating map instance from prop passed down
    this.props.onMapLoad(map);
  }

  componentDidMount() {
    //Check if script loading Google Maps API is already loaded
    //Make Async API call if API isn't already loaded
    if(!window.google) {
      let script = document.createElement('script');
      script.id = 'GoogleAPIScript';
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcGzKXNeOcVTjtGJ3mezaCbmfq3MAA3_c&v=3`;
      //Place our API call script on top of other scripts
      let grabFirstScript = document.getElementsByTagName('script')[0];
      grabFirstScript.parentNode.insertBefore(script, grabFirstScript);
      //Event Listener to instantiate map after Async call returns
      script.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      //Call onScriptLoad if google instance already exists within App
      //Reduces redundant API calls if you generate more than one map
      this.onScriptLoad()
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
