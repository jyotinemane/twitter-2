import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Feed.css';

const users = {
    english_user: { email: 'english@example.com', phone: '1234567890' },
    spanish_user: { email: 'spanish@example.com', phone: '2345678901' },
    hindi_user: { email: 'hindi@example.com', phone: '3456789012' },
    portuguese_user: { email: 'portuguese@example.com', phone: '4567890123' },
    chinese_user: { email: 'chinese@example.com', phone: '5678901234' },
    french_user: { email: 'french@example.com', phone: '6789012345' }
};

const sendOTP = (user, language) => {
    const otp = Math.floor(1000 + Math.random() * 9000); 
    if (language === 'french') {
        console.log(`Sending OTP ${otp} to ${user.email}`);
    } else {
        console.log(`Sending OTP ${otp} to ${user.phone}`);
    }
    return otp;
};

const LanguageSelection = ({ onSelectLanguage }) => {
    const [language, setLanguage] = useState('');
    const navigate = useNavigate();

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleContinue = () => {
        const user = users[`${language}_user`];
        if (user) {
            const otp = sendOTP(user, language);
            onSelectLanguage(language, otp);
            navigate('/OTPVerification');
        }
    };

    return (
        <div className='language'>
            <select value={language} onChange={handleLanguageChange} style={{ display: 'inline', marginLeft: '19rem', marginTop: '-10px' }}>
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="hindi">Hindi</option>
                <option value="portuguese">Portuguese</option>
                <option value="chinese">Chinese</option>
                <option value="french">French</option>
            </select>
            <Link to='/OTPVerification'>
            <button className='continue' disabled={!language} onClick={handleContinue}>Continue</button>
            </Link>
        </div>
    );
};

export default LanguageSelection;
