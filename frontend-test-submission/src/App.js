import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import UrlShortenerPage from './components/UrlShortenerPage';
import UrlShortenerStatsPage from './components/UrlShortenerStatsPage';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">Shorten URL</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<UrlShortenerPage />} />
          <Route path="/stats" element={<UrlShortenerStatsPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
