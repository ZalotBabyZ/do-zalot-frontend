import React from 'react';
import FAQ_Dashboard from '../../assets/images/FAQ_Dashboard.jpg';

function FAQ() {
  const imageStyle = { width: '80%', margin: '5px', border: 'var(--primary-color) 3px dashed' };
  const description = {
    width: '80%',
    margin: '5px',
    color: 'var(--primary-color)',
    textAlign: 'left',
    fontSize: '18px',
  };
  return (
    <div className="page">
      <p style={description}>DASHBOARD</p>
      <img src={FAQ_Dashboard} alt="FAQ_Dashboard" style={imageStyle} />
    </div>
  );
}

export default FAQ;
