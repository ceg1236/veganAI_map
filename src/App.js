import React, { useState } from 'react';
import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';
import PlaceList from './components/PlaceList';
import GPTGrader from './components/GPTGrader';
import './App.css'; // Import the new CSS file

function App() {
  const [places, setPlaces] = useState([]);
  const [currentPlaces, setCurrentPlaces] = useState([]);
  const [gradedPlaces, setGradedPlaces] = useState([]);

  return (
    <div className="app-container">
      {/* Left half: Map */}
      <div className="map-container">
        <MapContainer places={currentPlaces} setCurrentPlaces={setCurrentPlaces} />
      </div>

      {/* Right half: Buttons and list */}
      <div className="controls-container">
        <PlaceList currentPlaces={currentPlaces} />
        <GPTGrader currentPlaces={currentPlaces} gradedPlaces={gradedPlaces} setGradedPlaces={setGradedPlaces} />
      </div>
    </div>
  );
}

export default App;