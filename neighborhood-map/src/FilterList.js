import React from 'react';

function FilterList(props) {

  return(
  <div id="filter-bar">
    <div id="filter-title">Filter:</div>
    <select id="filter-options"
            onChange={
              (e) => {
            // See All Loc runs func to show all,
            // else the selected marker loc is filtered
                if(e.target.value === "See All Locations")
                  props.showAllLocations();
                else
                  props.onFilterMarker(e.target.value);
              }}>
      <option value="See All Locations"
              className="filter-option"
              >See All Locations</option>
    {/* Loop over locations and add listing for each */}
      {props.locations.map((location, index) => (
      <option key={index}
              value={index}
              className="filter-option"
          >{location.title}</option>
      ))}
    </select>
  </div>
  )
}


export default FilterList
