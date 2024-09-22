import React, { useState } from 'react';

function PlaceList({ gradedPlaces, currentPlaces }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <h3>Graded Places:</h3>
      <ul>
        {gradedPlaces.map((place, index) => (
          <li key={place.name}>
            <strong>{place.name} - Grade: {place.grade}</strong>
            <button className="toggle-description-button" onClick={() => toggleDescription(index)}>
              {expandedIndex === index ? "Less" : "More"}
            </button>
            {expandedIndex === index && <p>{place.explanation}</p>}
          </li>
        ))}
      </ul>

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