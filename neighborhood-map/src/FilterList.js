import React from 'react';

function FilterList(props) {

  // const generateList = (locations) => {
  //   locations.forEach((location) => {
  //     return <span id="location.title">location.title</span>
  //   })
  // }

  return(
    //Empty div to be populated by props passed down
  <div id="filter-list">
    <div id="drop-list" className="list-style">
      {props.locations.map((location, index) => (
        <span key={index + 100}
              id="location.title"
              className="list-title"
              onClick={() => props.onCenterLocation(location)}
              >{location.title}</span>
      ))}
      <span className="list-title"
            onClick={() => props.showAllLocations()}>
        See All
      </span>
    </div>
  </div>
  )
}


export default FilterList
