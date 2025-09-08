import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import URLShortenerPage from './pages/URLShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import RedirectPage from './pages/RedirectPage';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<URLShortenerPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/:shortcode" element={<RedirectPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
