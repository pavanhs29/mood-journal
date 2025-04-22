import React, { useState } from 'react';
import { getCurrentDate, formatDate } from '../utils/dateUtils';
import { moods } from '../utils/moodUtils';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Badge,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TodayIcon from '@mui/icons-material/Today';

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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  const todayEntries = entries.filter((entry) => entry.date === today);
  const selectedMoodData = selectedMood
    ? moods.find((m) => m.id === selectedMood)
    : null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: selectedMood
          ? `${selectedMoodData.color}33`
          : 'var(--card-bg)',
        transition: 'background-color 0.3s ease',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: 2,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TodayIcon color="primary" />
          <Typography
            variant="h5"
            component="h2">
            {formatDate(today)}
          </Typography>
        </Box>

        <Card
          elevation={2}
          sx={{ minWidth: { xs: '100%', sm: '220px' } }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Box sx={{ mr: 2 }}>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.condition}
                style={{ width: '50px', height: '50px' }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="div">
                {weather.temp}°C
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary">
                {weather.condition}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary">
                {weather.city}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ mb: 2 }}>
          How are you feeling right now?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          }}>
          {moods.map((mood) => {
            const MoodIcon = mood.icon;
            return (
              <Button
                key={mood.id}
                variant={selectedMood === mood.id ? 'contained' : 'outlined'}
                sx={{
                  p: 2,
                  minWidth: { xs: '45%', sm: '19%' },
                  borderRadius: 2,
                  flexDirection: 'column',
                  backgroundColor:
                    selectedMood === mood.id ? mood.color : 'transparent',
                  color: selectedMood === mood.id ? 'black' : 'inherit',
                  borderColor: mood.color,
                  '&:hover': {
                    backgroundColor: `${mood.color}66`,
                    borderColor: mood.color,
                  },
                  transition: 'all 0.2s ease',
                  transform:
                    selectedMood === mood.id ? 'scale(1.05)' : 'scale(1)',
                }}
                onClick={() => setSelectedMood(mood.id)}>
                <MoodIcon fontSize="large" />
                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}>
                  {mood.label}
                </Typography>
              </Button>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ mb: 2 }}>
          Add a note about your mood
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What made you feel this way? What's on your mind?"
          variant="outlined"
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={saveEntry}
        disabled={isSubmitting || !selectedMood}
        sx={{ mb: 3, py: 1.5 }}>
        {isSubmitting ? 'Saving...' : 'Add New Entry'}
      </Button>

      {todayEntries.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0,0,0,0.05)',
            p: 2,
            borderRadius: 1,
          }}>
          <Typography
            variant="h6"
            component="h3">
            Your entries today:
          </Typography>
          <Badge
            badgeContent={todayEntries.length}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '1rem',
                height: '24px',
                minWidth: '24px',
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
}

export default TodayView;
