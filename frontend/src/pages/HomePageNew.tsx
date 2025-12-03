import { useState } from 'react';
import './HomePageNew.css';

export function HomePage() {
  const [activeTab, setActiveTab] = useState('MICHAŁ');

  return (
    <div className="home-page-redesigned">
      {/* Status Bar */}
      <div className="status-bar">
        <span className="time">11:10</span>
        <div className="status-icons">
          <span>📶</span>
          <span>📡</span>
          <span>🔋 70</span>
        </div>
      </div>

      {/* Header Icons */}
      <div className="header-icons">
        <div className="icon-item">🌐</div>
        <div className="icon-item bell">
          🔔
          <span className="notification-dot"></span>
        </div>
        <div className="icon-item">💰 0,00 PLN</div>
        <div className="icon-item">📍 W POBLIŻU</div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'MICHAŁ' ? 'active' : ''}`}
          onClick={() => setActiveTab('MICHAŁ')}
        >
          MICHAŁ
        </button>
        <button 
          className={`tab ${activeTab === 'DODAJ' ? 'active' : ''}`}
          onClick={() => setActiveTab('DODAJ')}
        >
          DODAJ NOWĄ OSOBĘ
        </button>
      </div>

      {/* Profile Card */}
      {activeTab === 'MICHAŁ' && (
        <div className="profile-card-container">
          <div className="profile-card">
            <img src="/profile_card.png" alt="Profile Card" className="profile-card-image" />
          </div>
        </div>
      )}

      {/* Tickets Section */}
      <div className="tickets-section">
        <div className="tickets-grid">
          <div className="ticket-card image-ticket">
            <img 
              src="/swieta.png" 
              alt="Święta" 
              className="ticket-image"
            />
          </div>

          <div className="ticket-card image-ticket">
            <img 
              src="/lomot.png" 
              alt="Lo!Moto" 
              className="ticket-image"
            />
          </div>
        </div>

        <h2>POSIADANE BILETY</h2>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <button className="btn btn-pink">
            <img src="/rozowy.png" alt="Kup Bilet" className="btn-icon-img" />
            <span className="btn-text">KUP BILET</span>
          </button>
          <button className="btn btn-blue">
            <img src="/niebieski.png" alt="Zaparkuj" className="btn-icon-img" />
            <span className="btn-text">ZAPARKUJ</span>
          </button>
        </div>

        {/* Empty state message */}
        <div className="empty-state">
          <p>Nie posiadasz jeszcze biletów. Kliknij w przycisk aby dokonać!</p>
        </div>
      </div>
    </div>
  );
}