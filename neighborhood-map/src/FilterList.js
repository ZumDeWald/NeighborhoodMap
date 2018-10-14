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
    <button className="drop-button">Filter</button>
    <div id="drop-list" className="list-style">
      {props.locations.map((location, index) => (
        <span key={index + 100}
              id="location.title"
              className="list-title"
              onClick={() => props.onFilterLocations(location.title)}
              >{location.title}</span>
      ))}
    </div>
  </div>
  )
}


export default FilterList
