import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class InfoWindow extends Component {

  injectInfo(e, pass) {
    if (pass) {
      ReactDOM.render(
        <div className="info-window">
          <div>{this.props.loc.title}</div>
          <div>Name:{e.name}</div>
        </div>,
        document.getElementById(`${this.props.loc.title}`)
      )
    } else {
      ReactDOM.render(
        <div className="info-window-display">Error</div>,
        document.getElementById(`${this.props.loc.title}`)
      )
    }
  }

  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/5224911e11d21d67f10a97d0?client_id=BITALC3HSA4PLMTBLQXFRKDYX1Y0SCCWFBMWZC2SW2CTKJFW&client_secret=ESBUR3GBTUWVOYGUWQ4BGET0A3DGI0VYQTWCS2H1RU5CPK2W&v=20180601`)
    .then((response) => {
        if (response) {
          this.injectInfo(response, true);
          console.log(response.type);
        }
    })
    .catch((error) => {
      this.injectInfo(error, false);
    })
  }


  render() {
    return (
      //Empty div to be populated by injectInfo()
      <div id={this.props.loc.title}>Loading ...</div>
    )
  }
}


export default InfoWindow
