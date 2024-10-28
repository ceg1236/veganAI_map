import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './PlaceList.css';

function PlaceList({ gradedPlaces, currentPlaces }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isGradedPlacesVisible, setIsGradedPlacesVisible] = useState(true);
  const [isCurrentPlacesVisible, setIsCurrentPlacesVisible] = useState(true);

  // Toggle description visibility
  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Sort graded places by grade
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

  // Toggle visibility functions
  const toggleGradedPlacesVisibility = () => {
    setIsGradedPlacesVisible(!isGradedPlacesVisible);
  };

  const toggleCurrentPlacesVisibility = () => {
    setIsCurrentPlacesVisible(!isCurrentPlacesVisible);
  };

  return (
    <div className="place-list-container">
      {/* Graded Places Header */}
      <div className="collapsible-header" onClick={toggleGradedPlacesVisibility}>
        <h3>Graded Places</h3>
        {isGradedPlacesVisible ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isGradedPlacesVisible && (
        <div>
          {gradedPlaces.length > 0 ? (
            <>
              <div className="sort-controls">
                <button className="sort-button" onClick={toggleSortOrder}>
                  Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </button>
              </div>
              <ul className="graded-places-list">
                {sortedGradedPlaces.map((place, index) => (
                  <li key={place.place_id} className="graded-place-item">
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
                      <div className="place-description expanded">
                        <p>{place.explanation}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="info-text">No graded places yet</p>
          )}
        </div>
      )}

      {/* Current Places Header */}
      <div className="collapsible-header" onClick={toggleCurrentPlacesVisibility}>
        <h3>Current Places</h3>
        {isCurrentPlacesVisible ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isCurrentPlacesVisible && (
        <div>
          {currentPlaces.length > 0 ? (
            <ul className="current-places-list">
              {currentPlaces.map((place) => (
                <li key={place.place_id} className="current-place-item">
                  {place.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="info-text">No places in current search</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PlaceList;