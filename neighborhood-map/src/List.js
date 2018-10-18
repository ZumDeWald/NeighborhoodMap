import React from 'react';

function List(props) {

  //Destructuring for cleaner syntax within JSX
  const { locations } = props;

  return(
  <ul id="list">
    {/* Map over locations and generate List view */}
    {locations.map((location, index) => (
    <li key={index}
            className="list-item"
        >{location.title}</li>
    ))}
  </ul>
  )
}


export default List
