import React, { useState } from 'react';
import './PlaceList.css';

function PlaceList({ gradedPlaces, currentPlaces }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');  // Sort order state

  // Toggle description visibility
  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Sort graded places by grade (ascending or descending)
  const sortedGradedPlaces = [...gradedPlaces].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.grade.localeCompare(b.grade);
    } else {
      return b.grade.localeCompare(a.grade);
    }
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div>
      <h3>Graded Places:</h3>
      
      {/* Sorting controls */}
      <div className="sort-controls">
        <button onClick={toggleSortOrder}>
          Sort by Grade: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <ul>
        {sortedGradedPlaces.map((place, index) => (
          <li key={place.name} className="graded-place-item">
            <div className="place-info">
              <strong>{place.name}</strong>
              <div className="place-grade">Grade: {place.grade}</div>
              <button
                className="toggle-description-button"
                onClick={() => toggleDescription(index)}
              >
                {expandedIndex === index ? 'Less' : 'More'}
              </button>
            </div>
            {expandedIndex === index && (
              <div className="place-description">
                <p>{place.explanation}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h3>Current Places:</h3>
      <ul>
        {currentPlaces.map((place) => (
          <li key={place.place_id} className="current-place-item">
            {place.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaceList;