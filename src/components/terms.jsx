import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Auth.css'; 

export default function Terms() {
  const navigate = useNavigate(); 

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ width: '500px', textAlign: 'left' }}>
        <h2>Terms & Conditions</h2>
        
        <div style={{ color: '#d1d5db', fontSize: '14px', lineHeight: '1.6', marginTop: '20px' }}>
          <p><strong>1. Usage Policy:</strong><br />
          By registering, you agree to use this library system solely for academic and library-related activities.</p>
          
          <p><strong>2. Account Security:</strong><br />
          You are responsible for keeping your password safe. Any activity under your account is your responsibility.</p>
          
          <p><strong>3. Data Privacy:</strong><br />
          Your personal information will be kept confidential and will only be used for library administrative purposes.</p>
          
          <p><strong>4. Conduct:</strong><br />
          Misuse of the system or attempting to access unauthorized areas will result in account suspension.</p>
        </div>
        
        
        <button 
          className="submit-btn" 
          onClick={() => navigate('/register')} 
          style={{ marginTop: '20px' }}
        >
          BACK TO REGISTRATION
        </button>
      </div>
    </div>
  );
}