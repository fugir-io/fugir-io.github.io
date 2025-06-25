import React from 'react';

const Calendar: React.FC = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  return (
    <div style={{
      padding: '20px',
      height: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'SF Pro Display, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
      }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '600' }}>
          {currentMonth} {currentYear}
        </h1>
        <p style={{ margin: '10px 0', opacity: 0.8 }}>
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        opacity: 0.8,
      }}>
        <p>📅 Calendar app functionality coming soon...</p>
      </div>
    </div>
  );
};

export default Calendar;