import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

function MapContainer({ places, setCurrentPlaces }) {
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const searchWithinMap = () => {
    const bounds = mapRef.current.getBounds();
    const service = new window.google.maps.places.PlacesService(mapRef.current);

    const request = {
      bounds: bounds,
      type: ['restaurant'],
    //   keyword: 'vegan',
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setCurrentPlaces(results);
      } else {
        console.error('PlacesService nearbySearch failed with status:', status);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={(map) => (mapRef.current = map)}
        options={{fullscreenControl: false, streetViewControl: false,mapTypeControl: false}}
      >
        {/* Render markers for each place */}
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

        {/* Render InfoWindow when marker is clicked */}
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
      <button className="search-button" onClick={searchWithinMap}>
        Search Current Area
      </button>
    </LoadScript>
  );
}

export default MapContainer;