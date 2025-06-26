import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Analytics = () => {
  // Get tracking IDs from environment variables
  const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';
  const FB_PIXEL_ID = process.env.REACT_APP_FB_PIXEL_ID || 'XXXXXXXXXXXXXXXXX';
  const HOTJAR_ID = process.env.REACT_APP_HOTJAR_ID || 'XXXXXXX';

  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
      window.gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    // Initialize Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX') {
      window.fbq('track', 'PageView');
    }

    // Track scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        if (window.gtag && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
          window.gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: `${scrollPercent}%`,
            value: scrollPercent
          });
        }
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (window.gtag && GA_TRACKING_ID !== 'G-XXXXXXXXXX' && timeSpent > 0) {
        window.gtag('event', 'timing_complete', {
          name: 'page_view_duration',
          value: timeSpent
        });
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    window.addEventListener('beforeunload', trackTimeOnPage);
    
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, [GA_TRACKING_ID, FB_PIXEL_ID]);

  // Don't load tracking scripts if IDs are placeholder values
  const shouldLoadGA = GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX';
  const shouldLoadFB = FB_PIXEL_ID && FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX';
  const shouldLoadHotjar = HOTJAR_ID && HOTJAR_ID !== 'XXXXXXX';

  return (
    <Helmet>
      {/* Google Analytics 4 */}
      {shouldLoadGA && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true,
                anonymize_ip: true,
                cookie_expires: 63072000,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
          </script>
        </>
      )}

      {/* Facebook Pixel */}
      {shouldLoadFB && (
        <>
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </script>
        </>
      )}

      {/* Hotjar Tracking Code */}
      {shouldLoadHotjar && (
        <script>
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </script>
      )}
    </Helmet>
  );
};

// Enhanced analytics event tracking functions
export const trackEvent = (eventName, parameters = {}) => {
  const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
  
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      custom_parameters: {
        page_title: document.title,
        page_location: window.location.href,
        ...parameters
      }
    });
  }
  
  const FB_PIXEL_ID = process.env.REACT_APP_FB_PIXEL_ID;
  if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID && FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX') {
    window.fbq('track', eventName, parameters);
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, parameters);
  }
};

export const trackPurchase = (value, currency = 'USD', productName = '') => {
  trackEvent('purchase', {
    category: 'ecommerce',
    value: value,
    currency: currency,
    product_name: productName
  });
  
  const FB_PIXEL_ID = process.env.REACT_APP_FB_PIXEL_ID;
  if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID && FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX') {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency,
      content_name: productName,
      content_type: 'product'
    });
  }
};

export const trackEmailSignup = (source = 'website', listName = '') => {
  trackEvent('email_signup', {
    category: 'lead_generation',
    label: source,
    list_name: listName
  });
  
  const FB_PIXEL_ID = process.env.REACT_APP_FB_PIXEL_ID;
  if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID && FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX') {
    window.fbq('track', 'Lead', {
      content_name: 'Email Signup',
      content_category: source
    });
  }
};

export const trackBookDownload = (type = 'preview', chapter = '') => {
  trackEvent('book_download', {
    category: 'content',
    label: type,
    chapter: chapter
  });
  
  const FB_PIXEL_ID = process.env.REACT_APP_FB_PIXEL_ID;
  if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID && FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX') {
    window.fbq('track', 'ViewContent', {
      content_name: `Book Download - ${type}`,
      content_type: 'book'
    });
  }
};

export const trackFormInteraction = (formName, action = 'interact') => {
  trackEvent('form_interaction', {
    category: 'forms',
    label: formName,
    action: action
  });
};

export const trackExternalLink = (url, linkText = '') => {
  trackEvent('external_link_click', {
    category: 'navigation',
    label: url,
    link_text: linkText
  });
};

export const trackSocialShare = (platform, url = '') => {
  trackEvent('social_share', {
    category: 'social',
    label: platform,
    shared_url: url || window.location.href
  });
};

export const trackVideoInteraction = (videoName, action, progress = 0) => {
  trackEvent('video_interaction', {
    category: 'video',
    label: videoName,
    action: action, // play, pause, complete
    progress: progress
  });
};

export default Analytics;