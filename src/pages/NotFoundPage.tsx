import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'var(--system-font-family)',
      color: 'var(--system-color-primary-contrast)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;