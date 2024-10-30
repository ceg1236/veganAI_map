import React, { useState } from 'react';
import MapContainer from './components/MapContainer';
import PlaceList from './components/PlaceList';
import GPTGrader from './components/GPTGrader';
import './App.css';

function App() {
  const [places, setPlaces] = useState([]);
  const [currentPlaces, setCurrentPlaces] = useState([]);
  const [gradedPlaces, setGradedPlaces] = useState([]);
  const [overlayHeight, setOverlayHeight] = useState('middle'); // 'full', 'middle', 'minimized'

  const updateCurrentPlaces = (newPlaces) => {
    setCurrentPlaces(newPlaces);
  };

  return (
    <div className={`app-container ${overlayHeight}`}>
      <div className="map-container">
        <MapContainer
          places={currentPlaces}
          setCurrentPlaces={updateCurrentPlaces}
          gradedPlaces={gradedPlaces}
        />
      </div>
      <div className="controls-container">
        <PlaceList
          gradedPlaces={gradedPlaces}
          currentPlaces={currentPlaces}
          overlayHeight={overlayHeight}
          setOverlayHeight={setOverlayHeight}
        />
        <GPTGrader
          currentPlaces={currentPlaces}
          gradedPlaces={gradedPlaces}
          setGradedPlaces={setGradedPlaces}
          overlayHeight={overlayHeight}
        />
      </div>
    </div>
  );
}

export default App;