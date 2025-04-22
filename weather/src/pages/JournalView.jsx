import React, { useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import { moodObj } from '../utils/moodUtils';
import {
  InputAdornment,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';

function JournalView({ entries, loading, deleteEntry, formatTime }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

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

  return (
    <Box className="journal-view">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}>
        <TextField
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl
          sx={{ minWidth: 150 }}
          size="small">
          <InputLabel id="mood-filter-label">Mood Filter</InputLabel>
          <Select
            labelId="mood-filter-label"
            id="mood-filter"
            value={filter}
            label="Mood Filter"
            onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="all">All Moods</MenuItem>
            {Object.keys(moodObj).map((mood) => (
              <MenuItem
                key={mood}
                value={mood}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}>
                  {React.createElement(moodObj[mood].icon)}
                  <span>{moodObj[mood].label}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredEntries.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            p: 3,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
          }}>
          <Typography variant="body1">
            No entries found. Start tracking your mood today!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredEntries.map((entry) => (
            <Card
              key={entry.id}
              sx={{
                borderLeft: `5px solid ${moodObj[entry.mood].color}`,
                backgroundColor: `${moodObj[entry.mood].color}22`,
              }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {React.createElement(moodObj[entry.mood].icon)}
                    <Typography variant="subtitle1">
                      {moodObj[entry.mood].label}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary">
                    {formatDate(entry.date)}
                    {entry.dateTime && (
                      <span> at {formatTime(entry.dateTime)}</span>
                    )}
                  </Typography>
                </Box>

                {entry.note && (
                  <Typography
                    variant="body1"
                    sx={{ mt: 2, mb: 2 }}>
                    {entry.note}
                  </Typography>
                )}

                {entry.weather && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mt: 1,
                    }}>
                    <img
                      src={`https://openweathermap.org/img/wn/${entry.weather.icon}.png`}
                      alt={entry.weather.condition}
                      style={{ width: '24px', height: '24px' }}
                    />
                    <Chip
                      label={`${entry.weather.temp}°C • ${entry.weather.condition}`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                )}

                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant={
                      confirmDelete === entry.id ? 'contained' : 'outlined'
                    }
                    color={confirmDelete === entry.id ? 'error' : 'primary'}
                    size="small"
                    startIcon={
                      confirmDelete === entry.id ? (
                        <WarningIcon />
                      ) : (
                        <DeleteIcon />
                      )
                    }
                    onClick={() => handleDelete(entry.id)}>
                    {confirmDelete === entry.id ? 'Confirm Delete?' : 'Delete'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default JournalView;
