import React from 'react';

function List(props) {

  const { locations } = props;

  return(
  <ul id="list">
    {locations.map((location, index) => (
    <li key={index}
            className="list-item"
        >{location.title}</li>
    ))}
  </ul>
  )
}


export default List
