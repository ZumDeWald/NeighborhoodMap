import React from 'react';

function FilterList(props) {


  return(
    //Empty div to be populated by props passed down
  <div id="filter-bar">
    <div id="list-title">Filter Selections</div>
    <ul id="drop-list">
      {props.locations.map((location, index) => (
        <li key={index + 100}
              id="index"
              className="list-selection"
              onClick={() => props.onFilterMarker(location, index)}
              >{location.title}</li>
      ))}
    </ul>
    <div className="show-all-button"
          onClick={() => props.showAllLocations()}>
      See All
    </div>
  </div>
  )
}


export default FilterList
