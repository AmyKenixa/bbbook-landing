import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './brand.css';

// Import existing Home02 components
import Home02 from './components/pages/Home02';

// Import new components
import { ComingSoonPage } from './components/EmailCapture';
import SEO from './components/SEO';
import Analytics from './components/Analytics';
import CookieConsent from './components/CookieConsent';

function App() {
  // Set this to true to show coming soon page instead of main site
  const SHOW_COMING_SOON = true; // Change to true for coming soon mode

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="App" id="top">
          {/* Global SEO and Analytics */}
          <SEO />
          <Analytics />
          
          <Routes>
            <Route 
              path="/" 
              element={SHOW_COMING_SOON ? <ComingSoonPage /> : <Home02 />} 
            />
            <Route 
              path="/coming-soon" 
              element={<ComingSoonPage />} 
            />
            <Route 
              path="*" 
              element={SHOW_COMING_SOON ? <ComingSoonPage /> : <Home02 />} 
            />
          </Routes>
          
          {/* Cookie Consent Banner */}
          <CookieConsent />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;