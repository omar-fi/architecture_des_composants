import { useState } from 'react';
import ParkingSpots from './components/ParkingSpots';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('parking');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelectSpot = (spot) => {
    setSelectedSpot(spot);
    setActiveTab('reserve');
  };

  const handleReservationComplete = () => {
    setSelectedSpot(null);
    setRefreshKey(prev => prev + 1);
    setActiveTab('reservations');
  };

  const handleCancelReservation = () => {
    setSelectedSpot(null);
    setActiveTab('parking');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🚗 Smart Parking</h1>
        <p>Système de gestion de parking intelligent</p>
      </header>

      <nav className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'parking' ? 'active' : ''}`}
          onClick={() => setActiveTab('parking')}
        >
          🅿️ Places
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reserve' ? 'active' : ''}`}
          onClick={() => setActiveTab('reserve')}
        >
          📝 Réserver
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          📋 Réservations
        </button>
      </nav>

      <main className="content">
        {activeTab === 'parking' && (
          <ParkingSpots key={refreshKey} onSelectSpot={handleSelectSpot} />
        )}
        {activeTab === 'reserve' && (
          <ReservationForm 
            selectedSpot={selectedSpot}
            onReservationComplete={handleReservationComplete}
            onCancel={handleCancelReservation}
          />
        )}
        {activeTab === 'reservations' && (
          <ReservationList key={refreshKey} />
        )}
      </main>

      <footer className="footer">
        <p>Smart Parking System © 2024 - Gateway: localhost:8080</p>
      </footer>
    </div>
  );
}

export default App;
