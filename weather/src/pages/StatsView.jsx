import React from 'react';
import { moodObj } from '../utils/moodUtils';

function StatsView({ entries, loading }) {
  const getMoodCounts = () => {
    const counts = {
      great: 0,
      good: 0,
      neutral: 0,
      bad: 0,
      awful: 0,
    };

    entries.forEach((entry) => {
      if (counts[entry.mood] !== undefined) {
        counts[entry.mood]++;
      }
    });

    return counts;
  };

  const getWeatherMoodCorrelation = () => {
    const correlation = {};

    entries.forEach((entry) => {
      if (entry.weather) {
        const condition = entry.weather.condition;

        if (!correlation[condition]) {
          correlation[condition] = {
            great: 0,
            good: 0,
            neutral: 0,
            bad: 0,
            awful: 0,
            total: 0,
          };
        }

        correlation[condition][entry.mood]++;
        correlation[condition].total++;
      }
    });

    return correlation;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (entries.length === 0) {
    return (
      <div className="stats-view empty">
        <p>No entries yet. Start tracking your mood to see statistics.</p>
      </div>
    );
  }

  const moodCounts = getMoodCounts();
  const weatherMoodCorrelation = getWeatherMoodCorrelation();
  const totalEntries = entries.length;

  return (
    <div className="stats-view">
      <div className="stats-section">
        <h3>Mood Distribution</h3>
        <div className="mood-chart">
          {Object.keys(moodCounts).map((mood) => (
            <div
              className="mood-bar"
              key={mood}>
              <div className="bar-label">
                <span>{moodObj[mood].emoji}</span>
                <span>{moodObj[mood].label}</span>
              </div>
              <div className="bar-container">
                <div
                  className="bar"
                  style={{
                    width: `${(moodCounts[mood] / totalEntries) * 100}%`,
                    backgroundColor: moodObj[mood].color,
                  }}></div>
                <span className="bar-value">
                  {moodCounts[mood]} (
                  {Math.round((moodCounts[mood] / totalEntries) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3>Weather and Mood Correlation</h3>
        {Object.keys(weatherMoodCorrelation).length > 0 ? (
          <div className="correlation-table">
            <table>
              <thead>
                <tr>
                  <th>Weather</th>
                  {Object.keys(moodObj).map((mood) => (
                    <th key={mood}>{moodObj[mood].emoji}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(weatherMoodCorrelation).map((weather) => (
                  <tr key={weather}>
                    <td>{weather}</td>
                    {Object.keys(moodObj).map((mood) => (
                      <td
                        key={mood}
                        style={{
                          backgroundColor:
                            weatherMoodCorrelation[weather][mood] > 0
                              ? `${moodObj[mood].color}${Math.round(
                                  (weatherMoodCorrelation[weather][mood] /
                                    weatherMoodCorrelation[weather].total) *
                                    99
                                )}`
                              : 'transparent',
                        }}>
                        {weatherMoodCorrelation[weather][mood]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Not enough weather data to show correlations.</p>
        )}
      </div>
    </div>
  );
}

export default StatsView;
