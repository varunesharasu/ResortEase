import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h1>🎉 Booking Confirmed!</h1>
        <p>Thank you for choosing our resort. We look forward to welcoming you.</p>
        <Link to="/">
          <button className="home-btn">Return to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
