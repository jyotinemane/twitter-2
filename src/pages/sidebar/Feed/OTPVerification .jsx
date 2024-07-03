import React, { useState } from 'react';

const OTPVerification = ({ language, otp }) => {
    const [enteredOTP, setEnteredOTP] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');

    const handleOTPChange = (e) => {
        setEnteredOTP(e.target.value);
    };

    const handleSendOTP = () => {
        if (otp) {
            alert(`OTP sent: ${otp}`);
        } else {
            alert('OTP not provided');
        }
    };

    const handleVerifyOTP = () => {
        if (enteredOTP === otp.toString()) {
            setVerificationStatus('OTP Verified!');
            alert('OTP Verified!');
        } else {
            setVerificationStatus('Incorrect OTP. Please try again.');
            alert('Incorrect OTP. Please try again.');
        }
    };

    return (
        <div style={{boxShadow: '2px 2px 2px 2px #777',marginLeft: '23rem',width: '45%',
        textAlign:'center',justifyContent:'center',marginTop:'8rem',borderRadius: '22px'}}>
            <h2 style={{background: '#60628f',padding: '10px',borderRadius: '15px',color:'white'}}>OTP Verification for {language}</h2>
            <p style={{marginBottom: '30px',paddingTop:'10px'}}>Enter OTP sent to {language === 'french' ? 'email' : 'phone'}:</p>
            <button style={{borderRadius:'10px',backgroundColor:'rgb(92, 199, 243)',padding:'10px'}} onClick={handleSendOTP}>Send OTP</button>
            <input
                type='text'
                style={{marginBottom:'20px',borderRadius:'10px',padding:'10px'}}
                value={enteredOTP}
                onChange={handleOTPChange}
                placeholder='Enter OTP'
            />
            <button style={{borderRadius:'10px',backgroundColor:'rgb(92, 199, 243)',padding:'10px'}} onClick={handleVerifyOTP}>Verify OTP</button>
            <p>{verificationStatus}</p>
        </div>
    );
};

export default OTPVerification;
