import React from 'react';

function FilterList(props) {
  return(
    //Empty div to be populated by props passed down
  <div id="filter-list">
    <button className="drop-button">Filter</button>
    <div id="drop-list" className="list-style">
      <span id="first">Loc1</span>
      <span id="second">Loc2</span>
      <span id="third">Loc3</span>
      <span id="fourth">Loc4</span>
      <span id="fifth">Loc5</span>
    </div>
  </div>
  )
}


export default FilterList
