import React from 'react';

function SearchBar({ setPlaces }) {
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const service = new window.google.maps.places.AutocompleteService();
      const request = { input: e.target.value };

      service.getPlacePredictions(request, (predictions) => {
        if (predictions && predictions.length > 0) {
          const place = predictions[0];
          setPlaces([place]);
        }
      });
    }
  };

  return <input type="text" placeholder="Search for places..." onKeyPress={handleSearch} />;
}

export default SearchBar;