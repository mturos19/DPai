import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import VoiceSetup from './pages/VoiceSetup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/voice-setup" element={<VoiceSetup />} />
          {/* Add more routes as we create more pages */}
          <Route path="/" element={<VoiceSetup />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 