import React from 'react';

function FilterList(props) {


  return(
    //Empty div to be populated by props passed down
  <div id="filter-bar">
    <div id="filter-title">Filter:</div>
    <select id="filter-options">
      <option value="See All Locations"
              className="filter-option"
              onChange={(e) => props.onFilterMarker(e.value)}
              >See All Locations</option>
      {props.locations.map((location, index) => (
        <option key={index + 100}
            value={location}
            id="index"
            className="filter-option"
            >{location.title}</option>
      ))}
      {/* <option value="Bethlehem" className="filter-option">Bethlehem</option>
      <option value="Nazareth" className="filter-option">Nazareth</option>
      <option value="Capernaum" className="filter-option">Capernaum</option>
      <option value="Gesthsemane" className="filter-option">Gesthsemane</option>
      <option value="Church of the Holy Sepulchre" className="filter-option">Church of the Holy Sepulchre</option> */}
    </select>
    {/* <div id="list-title">Filter Selections</div>
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
    </div> */}
  </div>
  )
}


export default FilterList
