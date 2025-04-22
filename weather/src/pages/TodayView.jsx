import React, { useState, useEffect } from 'react';
import { getCurrentDate, formatDate } from '../utils/dateUtils';
import { moods } from '../utils/moodUtils';

function TodayView({
  entries,
  setEntries,
  weather,
  loading,
  displayModal,
  getCurrentDateTime,
}) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = getCurrentDate();

  const moods = [
    { id: 'great', emoji: '😀', label: 'Great', color: '#FFD700' },
    { id: 'good', emoji: '🙂', label: 'Good', color: '#90EE90' },
    { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#ADD8E6' },
    { id: 'bad', emoji: '😔', label: 'Bad', color: '#FFA07A' },
    { id: 'awful', emoji: '😠', label: 'Awful', color: '#FF6347' },
  ];

  const saveEntry = () => {
    if (!selectedMood) {
      displayModal('Please select a mood before saving');
      return;
    }

    setIsSubmitting(true);

    const now = getCurrentDateTime();
    const newEntry = {
      id: now,
      dateTime: now,
      date: today,
      mood: selectedMood,
      note: note.trim(),
      weather: weather
        ? {
            temp: weather.temp,
            condition: weather.condition,
            icon: weather.icon,
          }
        : null,
    };

    const updatedEntries = [...entries, newEntry].sort(
      (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );

    setEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));

    displayModal('Your mood has been saved!');
    setIsSubmitting(false);

    setSelectedMood(null);
    setNote('');
  };

  if (loading || !weather) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div
      className="today-view"
      style={{
        backgroundColor: selectedMood
          ? `${moods.find((m) => m.id === selectedMood).color}33`
          : 'var(--card-bg)',
      }}>
      <div className="date-weather-container">
        <div className="today-date">
          <h2>{formatDate(today)}</h2>
        </div>
        <div className="weather-display">
          <div className="weather-icon">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
            />
          </div>
          <div className="weather-info">
            <span className="temperature">{weather.temp}°C</span>
            <span className="condition">{weather.condition}</span>
            <span className="location">{weather.city}</span>
          </div>
        </div>
      </div>

      <div className="mood-selection">
        <h3>How are you feeling right now?</h3>
        <div className="mood-options">
          {moods.map((mood) => (
            <button
              key={mood.id}
              className={`mood-option ${
                selectedMood === mood.id ? 'selected' : ''
              }`}
              style={{
                backgroundColor:
                  selectedMood === mood.id ? mood.color : 'var(--card-bg)',
                transform: selectedMood === mood.id ? 'scale(1.1)' : 'scale(1)',
              }}
              onClick={() => setSelectedMood(mood.id)}>
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="note-input">
        <h3>Add a note about your mood</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What made you feel this way? What's on your mind?"
          rows={4}
        />
      </div>

      <button
        className="save-button"
        onClick={saveEntry}
        disabled={isSubmitting || !selectedMood}>
        {isSubmitting ? 'Saving...' : 'Add New Entry'}
      </button>

      {entries.filter((entry) => entry.date === today).length > 0 && (
        <div className="today-entries">
          <h3>Your entries today:</h3>
          <div className="entries-count">
            <span>
              {entries.filter((entry) => entry.date === today).length} entries
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodayView;
