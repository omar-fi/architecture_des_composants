import { useState, useEffect } from 'react';
import { reservationApi } from '../api/api';
import './ParkingSpots.css';

function ParkingSpots({ onSelectSpot }) {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    try {
      setLoading(true);
      
      // Récupérer les places
      const spotsData = await reservationApi.getAvailableSpots();
      
      // Récupérer les réservations actives
      let activeReservations = [];
      try {
        const reservationsRes = await reservationApi.getActive();
        activeReservations = reservationsRes.data || [];
      } catch (e) {
        console.log('Pas de réservations actives');
      }
      
      const now = new Date();
      
      // Marquer les places selon les réservations
      const spotsWithStatus = spotsData.map(spot => {
        // Réservation en cours (occupée)
        const activeRes = activeReservations.find(res => {
          if (res.parkingSpotId !== spot.id) return false;
          const debut = new Date(res.dateDebut);
          const fin = new Date(res.dateFin);
          return now >= debut && now <= fin;
        });
        
        if (activeRes) {
          return { ...spot, statut: 'OCCUPEE' };
        }
        
        // Réservation future
        const futureRes = activeReservations.find(res => {
          if (res.parkingSpotId !== spot.id) return false;
          const debut = new Date(res.dateDebut);
          return now < debut;
        });
        
        if (futureRes) {
          return { ...spot, statut: 'RESERVEE' };
        }
        
        return { ...spot, statut: 'DISPONIBLE' };
      });
      
      setSpots(spotsWithStatus);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement. Vérifiez que le backend est démarré.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'DISPONIBLE': return '#4CAF50';
      case 'OCCUPEE': return '#f44336';
      case 'RESERVEE': return '#ff9800';
      case 'HORS_SERVICE': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  if (loading) return <div className="loading">Chargement des places...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="parking-spots">
      <div className="section-header">
        <h2>🅿️ Places Disponibles</h2>
        <button className="refresh-btn" onClick={fetchSpots}>🔄 Actualiser</button>
      </div>
      
      <div className="legend">
        <span><span className="dot" style={{background: '#4CAF50'}}></span> Disponible</span>
        <span><span className="dot" style={{background: '#f44336'}}></span> Occupée</span>
        <span><span className="dot" style={{background: '#ff9800'}}></span> Réservée</span>
        <span><span className="dot" style={{background: '#9e9e9e'}}></span> Hors service</span>
      </div>

      {spots.length === 0 ? (
        <p className="no-data">Aucune place disponible pour le moment</p>
      ) : (
        <div className="spots-grid">
          {spots.map(spot => (
            <div 
              key={spot.id} 
              className={`spot-card ${spot.statut === 'DISPONIBLE' ? 'available' : ''}`}
              onClick={() => spot.statut === 'DISPONIBLE' && onSelectSpot(spot)}
            >
              <div className="spot-status" style={{background: getStatusColor(spot.statut)}}></div>
              <h3>{spot.numeroPlace}</h3>
              <p>{spot.emplacement}</p>
              <span className="status-badge">{spot.statut}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParkingSpots;
