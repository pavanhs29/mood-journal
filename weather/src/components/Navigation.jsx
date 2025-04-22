import React from 'react';

function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="app-nav">
      <ul>
        <li>
          <button
            className={activeTab === 'today' ? 'active' : ''}
            onClick={() => setActiveTab('today')}>
            Today
          </button>
        </li>
        <li>
          <button
            className={activeTab === 'journal' ? 'active' : ''}
            onClick={() => setActiveTab('journal')}>
            Journal
          </button>
        </li>
        <li>
          <button
            className={activeTab === 'calendar' ? 'active' : ''}
            onClick={() => setActiveTab('calendar')}>
            Calendar
          </button>
        </li>
        <li>
          <button
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}>
            Stats
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
