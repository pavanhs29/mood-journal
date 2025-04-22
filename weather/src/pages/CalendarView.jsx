import React, { useState } from 'react';
import { moodObj } from '../utils/moodUtils';

function CalendarView({ entries, loading }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getMonthData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}`;
      const entry = entries.find((e) => e.date === date);

      calendarDays.push({
        day,
        date,
        entry,
      });
    }

    return calendarDays;
  };

  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const monthData = getMonthData();
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>←</button>
        <h2>
          {monthName} {year}
        </h2>
        <button onClick={() => changeMonth(1)}>→</button>
      </div>

      <div className="calendar-grid">
        <div className="day-names">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="days">
          {monthData.map((dayData, index) => (
            <div
              key={index}
              className={`day-cell ${dayData ? 'has-day' : 'empty'}`}>
              {dayData && (
                <>
                  <span className="day-number">{dayData.day}</span>
                  {dayData.entry && (
                    <div
                      className="day-mood"
                      style={{
                        backgroundColor: moodObj[dayData.entry.mood].color,
                      }}
                      title={`${moodObj[dayData.entry.mood].emoji} - ${
                        dayData.entry.note || 'No note'
                      }`}>
                      <span>{moodObj[dayData.entry.mood].emoji}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
