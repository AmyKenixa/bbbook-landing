import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Bohemia Barcelona - The Ultimate Guide to Relocating & Living Well in Barcelona",
  description = "Transform your Barcelona dream into reality with the most complete relocation guide ever written. Expert advice on visas, neighborhoods, work, education, and building your new life in Barcelona.",
  keywords = "Barcelona relocation guide, move to Barcelona, Barcelona expat guide, living in Barcelona, Barcelona neighborhoods, Digital Nomad Visa Spain, Barcelona visa guide, expat life Barcelona",
  image = "/assets/images/banner/bohemia-barcelona-cover.png",
  url = "https://guide.bohemiabarcelona.com",
  type = "website"
}) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "Bohemia Barcelona: The Ultimate Guide to Relocating & Living Well in Barcelona",
    "author": {
      "@type": "Person",
      "name": "Amy Cancryn",
      "description": "Barcelona expat expert and community builder with 9+ years of experience"
    },
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "Bohemia Barcelona"
    },
    "genre": "Travel Guide, Relocation Guide",
    "bookFormat": "EBook, Paperback",
    "offers": [
      {
        "@type": "Offer",
        "price": "49",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "eBook Edition"
      },
      {
        "@type": "Offer",
        "price": "79",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Print Edition"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Barcelona Expat"
      },
      "reviewBody": "Barcelona is a city that encourages reinvention. Here, you can rediscover your passions, explore new horizons, and find your tribe."
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Amy Cancryn" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Bohemia Barcelona" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@bohemiabarcelona" />
      
      {/* Additional SEO Tags */}
      <meta name="geo.region" content="ES-CT" />
      <meta name="geo.placename" content="Barcelona" />
      <meta name="geo.position" content="41.3851;2.1734" />
      <meta name="ICBM" content="41.3851, 2.1734" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
    </Helmet>
  );
};

export default SEO;