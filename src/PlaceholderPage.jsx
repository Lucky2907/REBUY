import React from 'react';
import { useLocation } from 'react-router-dom';

const styles = {
  container: {
    padding: '4rem 2rem',
    textAlign: 'center',
    minHeight: '60vh',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginTop: '0.5rem',
  }
};

const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '').replace('-', ' ');
  
  // Capitalize first letter of each word
  const formattedPageName = pageName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{formattedPageName}</h1>
      <p style={styles.subtitle}>This page is under construction. Check back soon!</p>
    </div>
  );
};

export default PlaceholderPage; 