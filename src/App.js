import React, { useState } from 'react';
import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';
import PlaceList from './components/PlaceList';
import GPTGrader from './components/GPTGrader';
import './App.css';

function App() {
  const [places, setPlaces] = useState([]);
  const [currentPlaces, setCurrentPlaces] = useState([]);
  const [gradedPlaces, setGradedPlaces] = useState([]);

  const updateCurrentPlaces = (newPlaces) => {
    // Only add places that are not already graded
    const newUnseenPlaces = newPlaces.filter(
      (place) => !gradedPlaces.some((graded) => graded.name === place.name)
    );
    setCurrentPlaces(newUnseenPlaces);
  };

  return (
    <div className="app-container">
      <div className="map-container">
      <MapContainer
        places={currentPlaces}
        setCurrentPlaces={updateCurrentPlaces}
        gradedPlaces={gradedPlaces}  // Add this line
      />
      </div>
      <div className="controls-container">
        <PlaceList gradedPlaces={gradedPlaces} currentPlaces={currentPlaces} />
        <GPTGrader 
          currentPlaces={currentPlaces} 
          gradedPlaces={gradedPlaces} 
          setGradedPlaces={setGradedPlaces} 
        />
      </div>
    </div>
  );
}

export default App;