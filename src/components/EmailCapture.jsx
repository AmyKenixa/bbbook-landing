import React, { useState, useEffect } from 'react';
import { trackEmailSignup } from './Analytics';
import './EmailCapture.css';

const EmailCapture = ({ 
  type = 'newsletter', 
  title = "Get Early Access to Bohemia Barcelona",
  subtitle = "Be the first to know when the ultimate Barcelona relocation guide launches, plus get exclusive insider tips delivered to your inbox.",
  buttonText = "Get Early Access",
  source = 'website'
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Auto-show modal after 30 seconds for coming soon page
  useEffect(() => {
    if (type === 'modal') {
      const timer = setTimeout(() => {
        const hasSeenModal = localStorage.getItem('bohemia-email-modal-seen');
        if (!hasSeenModal) {
          setShowModal(true);
        }
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [type]);

  // Exit intent detection
  useEffect(() => {
    if (type === 'modal') {
      const handleMouseLeave = (e) => {
        if (e.clientY <= 0) {
          const hasSeenModal = localStorage.getItem('bohemia-email-modal-seen');
          if (!hasSeenModal) {
            setShowModal(true);
          }
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Check if environment variables exist
      if (!process.env.REACT_APP_ACUMBAMAIL_API_TOKEN) {
        console.error('Missing REACT_APP_ACUMBAMAIL_API_TOKEN');
        setStatus('error');
        setMessage('Configuration error: Missing API token');
        return;
      }
      
      if (!process.env.REACT_APP_ACUMBAMAIL_LIST_ID) {
        console.error('Missing REACT_APP_ACUMBAMAIL_LIST_ID');
        setStatus('error');
        setMessage('Configuration error: Missing list ID');
        return;
      }

      // Acumbamail API requires form-data format
      const formData = new FormData();
      formData.append('auth_token', process.env.REACT_APP_ACUMBAMAIL_API_TOKEN);
      formData.append('list_id', process.env.REACT_APP_ACUMBAMAIL_LIST_ID);
      formData.append('merge_fields[EMAIL]', email);
      formData.append('merge_fields[SOURCE]', source || 'website');
      formData.append('merge_fields[SIGNUP_DATE]', new Date().toISOString().split('T')[0]);
      formData.append('merge_fields[TAGS]', 'barcelona-guide,early-access');
      formData.append('response_type', 'json');

      console.log('Sending to Acumbamail:', {
        email,
        source,
        list_id: process.env.REACT_APP_ACUMBAMAIL_LIST_ID,
        hasToken: !!process.env.REACT_APP_ACUMBAMAIL_API_TOKEN
      });

      const response = await fetch('https://acumbamail.com/api/1/addSubscriber/', {
        method: 'POST',
        body: formData
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', response.headers);

      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      let result;
      try {
        result = await response.json();
        console.log('Parsed JSON result:', result);
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        const textResponse = await response.text();
        console.log('Raw response text:', textResponse);
        
        // If we can't parse JSON but response was ok, assume success
        if (response.ok) {
          setStatus('success');
          setMessage('Perfect! We\'ll notify you when the book is available.');
          setEmail('');
          
          if (typeof trackEmailSignup === 'function') {
            trackEmailSignup(source, 'acumbamail');
          }
          
          if (type === 'modal') {
            localStorage.setItem('bohemia-email-modal-seen', 'true');
            setTimeout(() => setShowModal(false), 3000);
          }
          return;
        } else {
          throw new Error(`Server returned ${response.status}: ${textResponse}`);
        }
      }

      // Check for success - multiple possible indicators
      if (result.status === 'success' || 
          result.success === true || 
          response.ok || 
          result.code === 200 ||
          (result.message && result.message.toLowerCase().includes('success'))) {
        
        setStatus('success');
        setMessage('Perfect! We\'ll notify you when the book is available.');
        setEmail('');
        
        // Track the signup
        if (typeof trackEmailSignup === 'function') {
          trackEmailSignup(source, 'acumbamail');
        }
        
        // Mark modal as seen
        if (type === 'modal') {
          localStorage.setItem('bohemia-email-modal-seen', 'true');
          setTimeout(() => setShowModal(false), 3000);
        }
        
      } else if (result.error || result.message) {
        // Handle specific errors
        const errorMsg = (result.error || result.message || '').toLowerCase();
        
        if (errorMsg.includes('already exists') || 
            errorMsg.includes('ya existe') ||
            errorMsg.includes('duplicate') ||
            errorMsg.includes('already subscribed') ||
            errorMsg.includes('subscriber already exists')) {
          setStatus('success');
          setMessage('You\'re already on our list! We\'ll let you know when it\'s ready.');
          setEmail('');
        } else if (errorMsg.includes('invalid email') || 
                   errorMsg.includes('email is not valid') ||
                   errorMsg.includes('email format')) {
          setStatus('error');
          setMessage('Invalid email address. Please check and try again.');
        } else if (errorMsg.includes('unauthorized') || 
                   errorMsg.includes('auth') ||
                   errorMsg.includes('token') ||
                   errorMsg.includes('forbidden')) {
          setStatus('error');
          setMessage('Configuration error. Please contact support.');
          console.error('API Auth Error:', result);
        } else {
          setStatus('error');
          setMessage(`Subscription failed: ${result.error || result.message}`);
          console.error('API Error:', result);
        }
      } else {
        // No clear success or error indicators - log everything for debugging
        console.warn('Unclear API response:', result);
        
        // If response was HTTP 200 but unclear result, assume success
        if (response.status === 200) {
          setStatus('success');
          setMessage('Perfect! We\'ll notify you when the book is available.');
          setEmail('');
          
          if (typeof trackEmailSignup === 'function') {
            trackEmailSignup(source, 'acumbamail');
          }
          
          if (type === 'modal') {
            localStorage.setItem('bohemia-email-modal-seen', 'true');
            setTimeout(() => setShowModal(false), 3000);
          }
        } else {
          setStatus('error');
          setMessage('Unclear response from server. Please try again.');
        }
      }

    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      setStatus('error');
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage('Network error. Please check your internet connection.');
      } else if (error.message.includes('cors') || error.message.includes('CORS')) {
        setMessage('Access blocked by browser. Please try again.');
      } else if (error.message.includes('Failed to fetch')) {
        setMessage('Unable to connect to server. Please try again.');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem('bohemia-email-modal-seen', 'true');
  };

  // Inline form component
  const EmailForm = ({ className = '' }) => (
    <form onSubmit={handleSubmit} className={`email-capture-form ${className}`}>
      <div className="form-group">
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="form-control"
            disabled={status === 'loading'}
            required
          />
          <button 
            type="submit" 
            className="btn btn-main"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </div>
      
      {message && (
        <div className={`form-message ${status}`}>
          {status === 'success' && <i className="fa fa-check-circle"></i>}
          {status === 'error' && <i className="fa fa-exclamation-circle"></i>}
          {message}
        </div>
      )}
      
      <p className="privacy-note">
        <i className="fa fa-lock"></i>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );

  // Render different types
  if (type === 'inline') {
    return (
      <div className="email-capture-inline">
        <div className="email-capture-content">
          <h4>{title}</h4>
          <p>{subtitle}</p>
          <EmailForm className="inline-form" />
        </div>
      </div>
    );
  }

  if (type === 'banner') {
    return (
      <section className="email-capture-banner section-padding bg-grey">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="email-capture-content">
                <h3>{title}</h3>
                <p className="lead">{subtitle}</p>
                <EmailForm className="banner-form" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (type === 'modal' && showModal) {
    return (
      <div className="email-modal-overlay">
        <div className="email-modal">
          <button className="modal-close" onClick={closeModal}>
            <i className="fa fa-times"></i>
          </button>
          
          <div className="modal-content">
            <div className="modal-icon">
              <i className="fa fa-envelope"></i>
            </div>
            
            <h3>{title}</h3>
            <p>{subtitle}</p>
            
            <EmailForm className="modal-form" />
            
            <div className="modal-benefits">
              <ul>
                <li><i className="fa fa-check"></i> Early access to the complete guide</li>
                <li><i className="fa fa-check"></i> Exclusive Barcelona insider tips</li>
                <li><i className="fa fa-check"></i> Free chapter previews</li>
                <li><i className="fa fa-check"></i> Special launch pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'footer') {
    return (
      <div className="email-capture-footer">
        <h5>Stay Updated</h5>
        <p>Get the latest Barcelona insights and updates</p>
        <EmailForm className="footer-form" />
      </div>
    );
  }

  return null;
};

// Separate Countdown Timer Component
const CountdownTimer = ({ launchDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="countdown-timer">
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.hours}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.minutes}</span>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.seconds}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
};

// Fixed Coming Soon Page Component
export const ComingSoonPage = () => {
  // Set your launch date here
  const launchDate = new Date('2025-09-02T00:00:00Z').getTime();

  return (
    <div className="coming-soon-page">
      <div className="container">
        <div className="row justify-content-center min-vh-100 align-items-center">
          <div className="col-lg-8 text-center">
            <div className="coming-soon-content">
              <div className="logo-section mb-4">
                <img 
                  src="/assets/images/logo.png" 
                  alt="Bohemia Barcelona" 
                  className="logo"
                />
              </div>
              
              <h1>Something Amazing is Coming Soon</h1>
              <p className="lead">
                The ultimate guide to relocating and living well in Barcelona is almost ready. 
                Be among the first to transform your Barcelona dream into reality.
              </p>
              
              {/* Separate Timer Component - Won't Cause Re-renders */}
              <CountdownTimer launchDate={launchDate} />
              
              {/* Email Capture - Now Won't Re-render */}
              <EmailCapture 
                type="inline"
                title="Get Early Access"
                subtitle="Be the first to know when we launch and get exclusive early-bird pricing"
                source="coming-soon"
              />
              
              <div className="coming-soon-features mt-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="feature-item">
                      <i className="fa fa-passport"></i>
                      <h5>Visa Guidance</h5>
                      <p>Complete visa and legal requirements breakdown</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-item">
                      <i className="fa fa-home"></i>
                      <h5>Housing Secrets</h5>
                      <p>Insider tips for finding the perfect Barcelona home</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-item">
                      <i className="fa fa-users"></i>
                      <h5>Community Access</h5>
                      <p>Connect with thriving expat community</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Exit intent modal */}
      <EmailCapture 
        type="modal"
        title="Wait! Don't Miss Out"
        subtitle="Get exclusive early access and special launch pricing for the ultimate Barcelona guide"
        source="exit-intent"
      />
    </div>
  );
};

export default EmailCapture;