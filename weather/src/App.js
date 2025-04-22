import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TodayView from './pages/TodayView';
import JournalView from './pages/JournalView';
import CalendarView from './pages/CalendarView';
import StatsView from './pages/StatsView';

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [entries, setEntries] = useState([]);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const formatTime = (dateTimeString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateTimeString).toLocaleTimeString(undefined, options);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation({ lat: 12.9716, lon: 77.5946 }); // Bengaluru as default
          displayModal(
            'Accessing the default location coz couldnt find curretn location'
          );
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocation({ lat: 12.9716, lon: 77.5946 }); // Bengaluru as default
      displayModal(
        'Accessing the default location coz couldnt find curretn location'
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  useEffect(() => {
    const savedEntries = JSON.parse(
      localStorage.getItem('moodEntries') || '[]'
    );
    setEntries(savedEntries);
    setLoading(false);

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // used openweathermap for API
  const fetchWeather = async () => {
    try {
      const API_KEY = '2d9e1728cf1e4f8e6a7bba0f163d22dd';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather({
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        city: data.name,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      displayModal('Could not fetch weather data. Please try again later.');
    }
  };

  const displayModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  // for deleting the enteries that been entered
  const deleteEntry = (entryId) => {
    const updatedEntries = entries.filter((entry) => entry.id !== entryId);
    setEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    displayModal('Entry deleted successfully');
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="main-content">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === 'today' && (
          <TodayView
            entries={entries}
            setEntries={setEntries}
            weather={weather}
            loading={loading}
            displayModal={displayModal}
            getCurrentDateTime={getCurrentDateTime}
          />
        )}

        {activeTab === 'journal' && (
          <JournalView
            entries={entries}
            loading={loading}
            deleteEntry={deleteEntry}
            formatTime={formatTime}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            entries={entries}
            loading={loading}
          />
        )}

        {activeTab === 'stats' && (
          <StatsView
            entries={entries}
            loading={loading}
          />
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
