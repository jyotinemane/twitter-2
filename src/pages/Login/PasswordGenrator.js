
import React from 'react';
import "./password.css";

function generatePassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password = charset[randomIndex];
    }
    return password;
  }
  
  
function PasswordGenerator() {
  const handleGeneratePassword = () => {
    const password = generatePassword();
    alert('Generated Password: ' + password);
  };

  return (
    <div className='pass'>
      <h2>Password Generator</h2>
      <button className="send" onClick={handleGeneratePassword}>Generate Password</button>
    </div>
  );
}

export default PasswordGenerator;
