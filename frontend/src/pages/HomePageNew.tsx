import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, X, Bike, Bus, Sparkles, CheckCircle, QrCode, User } from 'lucide-react';
import { mockUser, mockRanking } from '../data/mockData';
import './HomePageNew.css';

export function HomePage() {
  const navigate = useNavigate();
  const [showBikeScanner, setShowBikeScanner] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  
  // Przykładowe zadanie generowane przez AI (będzie z backendu)
  const dailyTask = {
    id: 'task-1',
    title: 'Wybierz dziś komunikację miejską',
    description: 'Zamiast samochodu skorzystaj z MPK i zdobądź dodatkowe punkty dla swojego osiedla',
    points: 50,
    completed: false,
    icon: '🚌',
  };

  return (
    <div className="home-page-new">
      {/* Header */}
      <header className="home-header-new">
        <div className="header-content">
          <div className="header-icon">
            <User size={28} />
          </div>
          <div>
            <p className="header-subtitle">Dzień dobry,</p>
            <h1>{mockUser.firstName}</h1>
          </div>
        </div>
        <div className="points-badge-new">
          <Star className="points-icon-new" size={18} fill="#FFC107" />
          <span className="points-value-new">{mockUser.points}</span>
          <span className="points-label-new">pkt</span>
        </div>
      </header>

      {/* AI Generated Daily Task */}
      <section className="daily-task-section">
        <div className="task-header">
          <div className="task-icon-badge">
            <Sparkles size={18} />
          </div>
          <div>
            <h3>Dzisiejsze wyzwanie</h3>
            <p className="task-subtitle">Wygenerowane specjalnie dla Ciebie</p>
          </div>
        </div>
        <div className="task-card">
          <div className="task-emoji">{dailyTask.icon}</div>
          <div className="task-content">
            <h4>{dailyTask.title}</h4>
            <p>{dailyTask.description}</p>
            <div className="task-reward">
              <Star size={16} fill="#FFC107" />
              <span>+{dailyTask.points} punktów</span>
            </div>
          </div>
          <button className="complete-task-btn">
            <CheckCircle size={20} />
          </button>
        </div>
      </section>

      {/* QR Code Bar */}
      <section className="qr-bar-section" onClick={() => navigate('/generate')}>
        <div className="qr-bar-icon">
          <QrCode size={28} />
        </div>
        <div className="qr-bar-content">
          <h3>Mój kod QR</h3>
          <p>Pokaż swój kod do skanowania</p>
        </div>
        <div className="qr-bar-arrow">→</div>
      </section>

      {/* Services - Bike & Ticket */}
      <section className="services-section">
        <h2>Usługi miejskie</h2>
        <div className="services-grid-large">
          <div className="service-card-large bike-service" onClick={() => setShowBikeScanner(true)}>
            <div className="service-card-icon">
              <Bike size={32} />
            </div>
            <h3>Wypożycz rower</h3>
            <p>Zeskanuj kod na rowerze miejskim</p>
          </div>
          <div className="service-card-large ticket-service" onClick={() => setShowTicketModal(true)}>
            <div className="service-card-icon">
              <Bus size={32} />
            </div>
            <h3>Kup bilet MPK</h3>
            <p>Bilety jednorazowe i okresowe</p>
          </div>
        </div>
      </section>

      {/* Ranking Preview */}
      <section className="ranking-preview">
        <div className="section-header">
          <h2>Twój ranking</h2>
          <button className="see-all-btn" onClick={() => navigate('/ranking')}>
            Zobacz wszystkie
          </button>
        </div>
        <div className="ranking-items">
          {mockRanking.slice(0, 3).map((user) => (
            <div key={user.id} className="ranking-item">
              <span className="rank-number">#{user.rank}</span>
              <div className="avatar-new">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="ranking-item-info">
                <span className="ranking-item-name">
                  {user.firstName} {user.lastName}
                </span>
                <span className="ranking-item-neighborhood">{user.neighborhood}</span>
              </div>
              <span className="ranking-item-points">{user.points} pkt</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bike Scanner Modal */}
      {showBikeScanner && (
        <div className="map-modal">
          <div className="scanner-modal-content">
            <div className="map-modal-header">
              <h2>Skanuj kod na rowerze</h2>
              <button className="close-modal-btn" onClick={() => setShowBikeScanner(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="scanner-placeholder">
              <div className="scanner-frame-preview"></div>
              <Bike size={64} />
              <p>Skieruj kamerę na kod QR na rowerze miejskim</p>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="map-modal">
          <div className="ticket-modal-content">
            <div className="map-modal-header">
              <h2>Kup bilet MPK</h2>
              <button className="close-modal-btn" onClick={() => setShowTicketModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="ticket-options">
              <div className="ticket-type">
                <h3>Bilety jednorazowe</h3>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Normalny 20 min</p>
                    <p className="ticket-btn-desc">Łódź strefa A</p>
                  </div>
                  <span className="ticket-btn-price">4.00 zł</span>
                </button>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Ulgowy 20 min</p>
                    <p className="ticket-btn-desc">Łódź strefa A</p>
                  </div>
                  <span className="ticket-btn-price">2.00 zł</span>
                </button>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Normalny 40 min</p>
                    <p className="ticket-btn-desc">Łódź strefa A</p>
                  </div>
                  <span className="ticket-btn-price">6.00 zł</span>
                </button>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Ulgowy 40 min</p>
                    <p className="ticket-btn-desc">Łódź strefa A</p>
                  </div>
                  <span className="ticket-btn-price">3.00 zł</span>
                </button>
              </div>
              <div className="ticket-type">
                <h3>Bilety okresowe</h3>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Normalny 30 dni</p>
                    <p className="ticket-btn-desc">Łódź wszystkie strefy</p>
                  </div>
                  <span className="ticket-btn-price">120.00 zł</span>
                </button>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Ulgowy 30 dni</p>
                    <p className="ticket-btn-desc">Łódź wszystkie strefy</p>
                  </div>
                  <span className="ticket-btn-price">60.00 zł</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
