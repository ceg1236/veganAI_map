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
    setCurrentPlaces(newPlaces);
  };

  return (
    <div className="app-container">
      <div className="map-container">
        <MapContainer
          places={currentPlaces}
          setCurrentPlaces={updateCurrentPlaces}
          gradedPlaces={gradedPlaces}
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