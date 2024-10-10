import React, { useEffect, useRef } from 'react';

function SearchBar({ setMapCenter }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    // Initialize the autocomplete service
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current);

    // Add listener for place selection
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry) {
        const location = place.geometry.location;
        setMapCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    });
  }, [setMapCenter]);

  return <input type="text" ref={inputRef} placeholder="Search for places..." />;
}

export default SearchBar;