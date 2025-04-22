import React, { useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import { moodObj } from '../utils/moodUtils';

function JournalView({ entries, loading, deleteEntry, formatTime }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const moods = {
    great: { emoji: '😀', label: 'Great', color: '#FFD700' },
    good: { emoji: '🙂', label: 'Good', color: '#90EE90' },
    neutral: { emoji: '😐', label: 'Neutral', color: '#ADD8E6' },
    bad: { emoji: '😔', label: 'Bad', color: '#FFA07A' },
    awful: { emoji: '😠', label: 'Awful', color: '#FF6347' },
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesMood = filter === 'all' || entry.mood === filter;
    const matchesSearch =
      !searchTerm ||
      (entry.note &&
        entry.note.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesMood && matchesSearch;
  });

  const handleDelete = (entryId) => {
    if (confirmDelete === entryId) {
      deleteEntry(entryId);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(entryId);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="journal-view">
      <div className="journal-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mood-filter">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Moods</option>
            {Object.keys(moods).map((mood) => (
              <option
                key={mood}
                value={mood}>
                {moods[mood].emoji} {moods[mood].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="no-entries">
          <p>No entries found. Start tracking your mood today!</p>
        </div>
      ) : (
        <div className="entries-list">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="entry-card"
              style={{
                borderLeft: `5px solid ${moods[entry.mood].color}`,
                backgroundColor: `${moods[entry.mood].color}22`,
              }}>
              <div className="entry-header">
                <div className="entry-mood">
                  <span className="mood-emoji">{moods[entry.mood].emoji}</span>
                  <span className="mood-label">{moods[entry.mood].label}</span>
                </div>
                <div className="entry-date">
                  {formatDate(entry.date)}
                  {entry.dateTime && (
                    <span className="entry-time">
                      {' '}
                      at {formatTime(entry.dateTime)}
                    </span>
                  )}
                </div>
              </div>

              {entry.note && (
                <div className="entry-note">
                  <p>{entry.note}</p>
                </div>
              )}

              {entry.weather && (
                <div className="entry-weather">
                  <img
                    src={`https://openweathermap.org/img/wn/${entry.weather.icon}.png`}
                    alt={entry.weather.condition}
                  />
                  <span>
                    {entry.weather.temp}°C • {entry.weather.condition}
                  </span>
                </div>
              )}

              <div className="entry-actions">
                <button
                  className={`delete-button ${
                    confirmDelete === entry.id ? 'confirm' : ''
                  }`}
                  onClick={() => handleDelete(entry.id)}>
                  {confirmDelete === entry.id ? 'Confirm Delete?' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JournalView;
