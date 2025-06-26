import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { trackEmailSignup } from './Analytics';
import './EmailCapture.css';

const EmailCapture = ({ 
  type = 'newsletter', 
  title = "Get Early Access to Bohemia Barcelona",
  subtitle = "Be the first to know when the ultimate Barcelona relocation guide launches, plus get exclusive insider tips delivered to your inbox.",
  buttonText = "Get Early Access",
  source = 'website'
}) => {
  const emailRef = useRef('');
  const [status, setStatus] = useState('idle');
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
      }, 30000);

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
    const email = emailRef.current;
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      const formData = new FormData();
      formData.append('auth_token', process.env.REACT_APP_ACUMBAMAIL_API_TOKEN);
      formData.append('list_id', process.env.REACT_APP_ACUMBAMAIL_LIST_ID);
      formData.append('merge_fields[EMAIL]', email);
      formData.append('merge_fields[SOURCE]', source || 'website');
      formData.append('response_type', 'json');

      const response = await fetch('https://acumbamail.com/api/1/addSubscriber/', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      setStatus('success');
      setMessage('Perfect! We\'ll notify you when the book is available.');
      emailRef.current = '';
      
      if (typeof trackEmailSignup === 'function') {
        trackEmailSignup(source, 'acumbamail');
      }
      
      if (type === 'modal') {
        localStorage.setItem('bohemia-email-modal-seen', 'true');
        setTimeout(() => setShowModal(false), 3000);
      }

    } catch (error) {
      setStatus('success');
      setMessage('Perfect! We\'ll notify you when the book is available.');
      emailRef.current = '';
    }
  };

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem('bohemia-email-modal-seen', 'true');
  };

  const EmailForm = memo(({ className = '' }) => (
    <form onSubmit={handleSubmit} className={`email-capture-form ${className}`}>
      <div className="form-group">
        <div className="stacked-input-group">
          <input
            type="email"
            defaultValue={emailRef.current}
            onChange={(e) => emailRef.current = e.target.value}
            placeholder="Enter your email address"
            className="form-control stacked-input"
            disabled={status === 'loading'}
            required
          />
          <button 
            type="submit" 
            className="btn btn-main stacked-button"
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
  ));

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

const CountdownTimer = memo(({ launchDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance > 0) {
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    }
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }, [launchDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

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
});

export const ComingSoonPage = () => {
  const launchDate = new Date('2025-09-02T00:00:00Z').getTime();
  const MemoizedEmailCapture = memo(() => (
    <EmailCapture 
      type="inline"
      title="Get Early Access"
      subtitle="Be the first to know when we launch and get exclusive early-bird pricing"
      source="coming-soon"
    />
  ));

  const MemoizedModalEmailCapture = memo(() => (
    <EmailCapture 
      type="modal"
      title="Wait! Don't Miss Out"
      subtitle="Get exclusive early access and special launch pricing for the ultimate Barcelona guide"
      source="exit-intent"
    />
  ));

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
              
              <CountdownTimer launchDate={launchDate} />
              
              <div className="email-capture-wrapper">
                <MemoizedEmailCapture />
              </div>
              
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
      
      <MemoizedModalEmailCapture />
    </div>
  );
};

export default EmailCapture;