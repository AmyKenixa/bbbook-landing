import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('bohemia-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      initializeServices(savedPreferences);
    }
  }, []);

  const initializeServices = (prefs) => {
    // Initialize analytics only if consented
    if (prefs.analytics && typeof window !== 'undefined') {
      // Enable Google Analytics
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
      
      // Enable Facebook Pixel
      if (window.fbq) {
        window.fbq('consent', 'grant');
      }
    }

    // Initialize marketing cookies if consented
    if (prefs.marketing && typeof window !== 'undefined') {
      // Enable marketing tracking
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
    }

    // Initialize functional cookies if consented
    if (prefs.functional && typeof window !== 'undefined') {
      // Enable functional features like chat widgets, etc.
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('bohemia-cookie-consent', JSON.stringify(allAccepted));
    initializeServices(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('bohemia-cookie-consent', JSON.stringify(preferences));
    initializeServices(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    setPreferences(onlyNecessary);
    localStorage.setItem('bohemia-cookie-consent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <div className="cookie-text">
              <h4>🍪 We Value Your Privacy</h4>
              <p>
                We use cookies to enhance your experience on our website, analyze website traffic, 
                and provide personalized content. By clicking "Accept All", you consent to our use 
                of cookies. You can also customize your preferences.
              </p>
            </div>
            <div className="cookie-actions">
              <button 
                className="btn-cookie btn-accept-all" 
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
              <button 
                className="btn-cookie btn-customize" 
                onClick={openSettings}
              >
                Customize
              </button>
              <button 
                className="btn-cookie btn-reject" 
                onClick={handleRejectAll}
              >
                Reject All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="cookie-modal-overlay">
          <div className="cookie-modal">
            <div className="cookie-modal-header">
              <h3>Cookie Preferences</h3>
              <button className="cookie-close" onClick={closeSettings}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            
            <div className="cookie-modal-body">
              <p className="cookie-description">
                Choose which cookies you want to accept. You can change these settings at any time.
              </p>
              
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.necessary}
                      disabled={true}
                      readOnly
                    />
                    <span className="cookie-slider"></span>
                  </label>
                  <div>
                    <h4>Necessary Cookies</h4>
                    <p>Essential for the website to function properly. These cannot be disabled.</p>
                  </div>
                </div>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.analytics}
                      onChange={() => handlePreferenceChange('analytics')}
                    />
                    <span className="cookie-slider"></span>
                  </label>
                  <div>
                    <h4>Analytics Cookies</h4>
                    <p>Help us understand how visitors interact with our website to improve user experience.</p>
                  </div>
                </div>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.marketing}
                      onChange={() => handlePreferenceChange('marketing')}
                    />
                    <span className="cookie-slider"></span>
                  </label>
                  <div>
                    <h4>Marketing Cookies</h4>
                    <p>Used to track visitors across websites to display relevant advertisements.</p>
                  </div>
                </div>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.functional}
                      onChange={() => handlePreferenceChange('functional')}
                    />
                    <span className="cookie-slider"></span>
                  </label>
                  <div>
                    <h4>Functional Cookies</h4>
                    <p>Enable enhanced functionality and personalization, such as live chat and videos.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cookie-modal-footer">
              <button 
                className="btn-cookie btn-accept-selected" 
                onClick={handleAcceptSelected}
              >
                Save Preferences
              </button>
              <button 
                className="btn-cookie btn-accept-all-modal" 
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;