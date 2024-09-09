import React from 'react';

function PlaceList({ currentPlaces }) {
  return (
    <div>
      <h3>Current Places:</h3>
      <ul>
        {currentPlaces.map((place) => (
          <li key={place.place_id}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlaceList;