import React from 'react';
import { exportEntries } from '../utils/exportUtils';
import { IconButton, Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="app-header">
      <h1>Mood Journal</h1>
      <div className="header-controls">
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode">
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <button
          className="export-btn"
          onClick={() => exportEntries()}
          aria-label="Export data">
          <FileDownloadIcon style={{ transform: 'translateY(5px)' }} /> Export
        </button>
      </div>
    </header>
  );
}

export default Header;
