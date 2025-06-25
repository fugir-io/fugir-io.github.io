import React, { useEffect } from 'react';
import Desktop from '🍎/components/Desktop/Desktop';

/**
 * Page File for Desktop View
 * This file represents the page file for the desktop view.
 * It imports the Desktop component and displays it.
 */
const HomePage: React.FC = () => {
  useEffect(() => {
    // DEBUG: Extract parameters from the URL query string
    // Iterate through the parameters and log each key-value pair to the console
    const params = new URLSearchParams(window.location.search);
    
    for (const [key, value] of params.entries()) {
      console.log(`desktop.Page key=> ${key} value=> ${value}`);
    }
  }, []);

  return <Desktop />;
};

export default HomePage;