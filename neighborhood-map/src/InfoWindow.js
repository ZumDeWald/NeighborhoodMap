import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class InfoWindow extends Component {

  injectInfo(e, pass) {
    if (pass) {
      ReactDOM.render(
        <div className="info-window">
          <div>{this.props.loc.title}</div>
          <div>{e.response.venue.location.address}</div>
          <div>{e.response.venue.tips.groups[0].items[0].text}</div>
        </div>,
        document.getElementById(`${this.props.loc.title}`)
      )
    } else {
      ReactDOM.render(
        <div className="info-window-display">Error {e.error}</div>,
        document.getElementById(`${this.props.loc.title}`)
      )
    }
  }

  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/${this.props.loc.id}?client_id=BITALC3HSA4PLMTBLQXFRKDYX1Y0SCCWFBMWZC2SW2CTKJFW&client_secret=ESBUR3GBTUWVOYGUWQ4BGET0A3DGI0VYQTWCS2H1RU5CPK2W&v=20180601`)
    .then(function(response) {return response.json()})
    .then((response) => {
        if (response) {
          this.injectInfo(response, true);
          console.log(response);
        }
    })
    .catch((error) => {
      this.injectInfo(error, false);
    })
  }


  render() {
    const { loc } = this.props
    return (
      //Empty div to be populated by injectInfo()
      <div id={loc.title}>Loading ...</div>
    )
  }
}


export default InfoWindow
