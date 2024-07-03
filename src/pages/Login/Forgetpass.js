

import React, { useState } from 'react';
import axios from 'axios';
// import PasswordGenerator from './PasswordGenrator';

const Forgetpass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending reset email:', error);
      setMessage('Failed to send reset email. Please try again later.');
    }
  };

  return (
    <div style={{boxShadow: '2px 2px 2px 2px #777',marginLeft: '23rem',width: '45%',
    textAlign:'center',justifyContent:'center',marginTop:'8rem',borderRadius: '22px'}}>
      <h3 style={{background: '#60628f',padding: '10px',borderRadius: '15px',color:'white'}}>Forgot Your Password?</h3>
      <p style={{marginBottom: '30px',paddingTop:'10px'}}>Enter your email address below to receive a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <input
          style={{marginLeft: '70px',width:'25rem'}}
          type="email"
          className="input mt-2"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="reset" onClick={handleSubmit} style={{fontSize:'20px',color:'black',background: 'var(--twitter-color)',borderRadius:'10px',marginBottom:'10px',padding:'10px',cursor:'pointer'}}>
          Send Reset Email
        </button>
      </form>
      {message && <p style={{paddingBottom:'10px'}}>{message}</p>}
    </div>
  );
};

export default Forgetpass;
