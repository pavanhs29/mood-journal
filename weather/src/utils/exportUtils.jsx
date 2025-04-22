export function exportEntries() {
  const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  if (entries.length === 0) {
    alert('No entries to export');
    return;
  }

  let csvContent = 'Date,Mood,Weather,Temperature,Note\n';

  entries.forEach((entry) => {
    const date = entry.date;
    const mood = entry.mood;
    const weather = entry.weather ? entry.weather.condition : 'N/A';
    const temp = entry.weather ? `${entry.weather.temp}°C` : 'N/A';
    const note = entry.note ? `"${entry.note.replace(/"/g, '""')}"` : '';

    csvContent += `${date},${mood},${weather},${temp},${note}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `mood-journal-export-${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
