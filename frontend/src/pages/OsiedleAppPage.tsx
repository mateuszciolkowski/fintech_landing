import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, TrendingUp, Trophy, CheckCircle } from 'lucide-react';
import './OsiedleAppPage.css';

export function OsiedleAppPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tasks' | 'ranking' | 'achievements'>('tasks');

  // Mock data dla zadań
  const tasks = [
    {
      id: '1',
      title: 'Wybierz komunikację miejską',
      description: 'Zamiast samochodu skorzystaj z MPK i zdobądź dodatkowe punkty',
      points: 50,
      icon: '🚌',
      completed: false,
    },
    {
      id: '2',
      title: 'Postaw rower w stacji',
      description: 'Korzystaj z rowerów miejskich i wspieraj zielone osiedle',
      points: 30,
      icon: '🚲',
      completed: true,
    },
    {
      id: '3',
      title: 'Wrzuć śmieci do recyklingu',
      description: 'Segreguj odpady i chrań środowisko',
      points: 20,
      icon: '♻️',
      completed: false,
    },
  ];

  // Mock data dla rankingu osiedli
  const neighborhoodRanking = [
    { rank: 1, name: 'Widzew', points: 2850, members: 234 },
    { rank: 2, name: 'Łódź Górna', points: 2650, members: 198 },
    { rank: 3, name: 'Śródmieście', points: 2420, members: 156 },
    { rank: 4, name: 'Polesie', points: 2100, members: 142 },
  ];

  const achievements = [
    { id: '1', title: 'Ekolog', description: '10 zadań ukończonych', icon: '🌱' },
    { id: '2', title: 'Mistrz Transportu', description: '20 przejazdów MPK', icon: '🚍' },
    { id: '3', title: 'Lider Osiedla', description: 'Pierwszy w rankingu', icon: '👑' },
  ];

  return (
    <div className="osiedle-app-page">
      {/* Header */}
      <header className="osiedle-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>MOJE OSIEDLE</h1>
        <div className="header-points">🏆 2,450 pkt</div>
      </header>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <Zap size={20} />
          <span>Zadania</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'ranking' ? 'active' : ''}`}
          onClick={() => setActiveTab('ranking')}
        >
          <TrendingUp size={20} />
          <span>Ranking</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <Trophy size={20} />
          <span>Osiągnięcia</span>
        </button>
      </div>

      {/* Content */}
      <div className="osiedle-content">
        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <h2>Dzisiejsze zadania</h2>
            <div className="tasks-list">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={`task-card ${task.completed ? 'completed' : ''}`}
                >
                  <div className="task-icon">{task.icon}</div>
                  <div className="task-content">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                  <div className="task-points">
                    <span className="points-badge">+{task.points}</span>
                    {task.completed && <CheckCircle size={24} className="completed-check" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ranking Tab */}
        {activeTab === 'ranking' && (
          <div className="ranking-section">
            <h2>Ranking osiedli</h2>
            <div className="ranking-list">
              {neighborhoodRanking.map(neighborhood => (
                <div key={neighborhood.rank} className="ranking-item">
                  <div className="rank-badge">{neighborhood.rank}</div>
                  <div className="ranking-info">
                    <h3>{neighborhood.name}</h3>
                    <p>{neighborhood.members} członków</p>
                  </div>
                  <div className="ranking-points">
                    <span className="points">{neighborhood.points}</span>
                    <span className="label">pkt</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="achievements-section">
            <h2>Twoje osiągnięcia</h2>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
