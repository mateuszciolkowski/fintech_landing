import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Star, ArrowLeft } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import './EventsPage.css';

export function EventsPage() {
  const navigate = useNavigate();
  const [sortedEvents] = useState(
    [...mockEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="events-page">
      <header className="events-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Wydarzenia</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="events-list">
        {sortedEvents.map((event) => (
          <div key={event.id} className="event-card-full">
            <div className="event-date-badge">
              <Calendar size={16} />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <h3>{event.title}</h3>
            
            <div className="event-location-row">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
            
            <p className="event-description">{event.description}</p>
            
            <div className="event-footer">
              <div className="event-points-badge">
                <Star size={14} fill="#FFC107" />
                <span>+{event.points} pkt</span>
              </div>
              <button 
                className="event-details-btn"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                Szczegóły
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
