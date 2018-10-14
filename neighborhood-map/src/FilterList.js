import React from 'react';

function FilterList(props) {
  return(
    //Empty div to be populated by props passed down
  <div id="filter-list">
    <button className="drop-button">Filter</button>
    <div id="drop-list" className="list-style">
      <span id="1">Loc1</span>
      <span id="2">Loc2</span>
      <span id="3">Loc3</span>
      <span id="4">Loc4</span>
      <span id="5">Loc5</span>
    </div>
  </div>
  )
}


export default FilterList
