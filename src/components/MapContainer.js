import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 40.7128,  // New York City
  lng: -74.0060,
};

function MapContainer({ places, setCurrentPlaces }) {
  const mapRef = useRef(null);  // Ref to store map instance
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [isMapLoaded, setIsMapLoaded] = useState(false);  // Track map loading

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userLocation);
          if (mapRef.current) {
            mapRef.current.panTo(userLocation);
          }
        },
        () => {
          console.warn('Geolocation failed or is not supported by your browser.');
        }
      );
    } else {
      console.warn('Geolocation is not supported by your browser.');
    }
  };

  // Ensure map is loaded before calling Places API or interacting with it
  const searchWithinMap = () => {
    if (!mapRef.current) {
      console.warn('Map instance is not ready');
      return;
    }

    const bounds = mapRef.current.getBounds();
    if (!bounds) {
      console.warn('Unable to get bounds of the map');
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapRef.current);

    const request = {
      bounds: bounds,
      type: ['restaurant'],
      fields: ['place_id', 'geometry', 'name', 'vicinity', 'rating', 'user_ratings_total', 'price_level', 'opening_hours'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setCurrentPlaces(results);
      } else {
        console.error('PlacesService nearbySearch failed with status:', status);
      }
    });
  };

  useEffect(() => {
    locateUser();
  }, []);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={14}
        onLoad={(map) => {
          mapRef.current = map;
          setIsMapLoaded(true);  // Set map as loaded
        }}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {/* Render markers */}
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            onClick={() => setSelectedPlace(place)}
          />
        ))}

        {/* Render InfoWindow */}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h2>{selectedPlace.name}</h2>
              <p>{selectedPlace.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Search Button */}
      <button className="search-button" onClick={searchWithinMap} disabled={!isMapLoaded}>
        {isMapLoaded ? 'Search Current Area' : 'Loading Map...'}
      </button>
    </LoadScript>
  );
}

export default MapContainer;