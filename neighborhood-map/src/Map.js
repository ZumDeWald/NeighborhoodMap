import React, { Component } from 'react';



class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  //Once script loads store new Google Map instance in const map
  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    //Check if script pulling in Google Maps API is already loaded
    //Make Async API call if API isn't already loaded
    if(!window.google) {
      let script = document.createElement('script');
      script.id = 'GoogleAPIScript';
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcGzKXNeOcVTjtGJ3mezaCbmfq3MAA3_c&v=3`;
      let grabScript = document.getElementById('GoogleAPIScript');
      grabScript.parentNode.insertBefore(script, grabScript);

      //Event Listener to instantiate map AFTER Async call returns
      script.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ width: `100%`, height: `500px` }} id={this.props.id} />
    );
  }

}

export default Map
