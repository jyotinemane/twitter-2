import React, { useState } from 'react';
import { AiFillAudio } from "react-icons/ai";
import vmsg from 'vmsg';
import "./Audio.css";

const recorder = new vmsg.Recorder({
    wasmURL: 'https://unpkg.com/vmsg@0.3/vmsg.wasm'
});

const AudioRecorder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState([]);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const record = async () => {
        const now = new Date();
        const hour = now.getHours();
        const allowedTimeRange = hour >= 14 && hour < 19; // 2pm to 7pm IST

        if (!allowedTimeRange) {
            alert("You can only record between 2pm to 7pm IST.");
            return;
        }

        setIsLoading(true);

        if (isRecording) {
            const blob = await recorder.stopRecording();
            const blobSize = blob.size;
            const blobDuration = await getBlobDuration(blob);

            if (blobDuration > 300 || blobSize > 100000000) {
                alert("Audio length should not be more than 5 minutes or 100 MB.");
                setIsLoading(false);
                return;
            }

            setRecordings([...recordings, URL.createObjectURL(blob)]);
            setIsLoading(false);
            setIsRecording(false);
        } else {
            if (!isEmailVerified) {
                alert('Please verify your email first.');
                return;
            }

            try {
                await recorder.initAudio();
                await recorder.initWorker();
                recorder.startRecording();
                setIsLoading(false);
                setIsRecording(true);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        }
    };

    const handleEmailVerification = async () => {
        // Your code to send email with OTP and verify it
        setIsEmailVerified(true); // For now, just setting it as true directly
    };

    const handlePostToTwitter = async () => {
        // Your code to post the audio to Twitter
    };

    const getBlobDuration = async (blob) => {
        const audio = new Audio(URL.createObjectURL(blob));
        await audio.load();
        return audio.duration;
    };

    return (
        <div>

            <header>
                <button className="button" onClick={record} disabled={isLoading}>
                    {isRecording ? 'Stop' : 'Record'}
                    <AiFillAudio style={{ marginLeft: "2px", fontSize: "20px" }} />
                </button>
                <ul style={{ listStyle: 'none', padding: '10px' }}>
                    {recordings.map(url => (
                        <li key={url}>
                            <audio className="audio" src={url} controls></audio>
                        </li>
                    ))}
                </ul>
                {!isEmailVerified && (
                    <div>
                        <input
                            className='input'
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button className="verify" onClick={handleEmailVerification}>Send OTP</button>
                        <input
                            type="text"
                            className='input1'
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                        />
                        <button className="verify1" onClick={handleEmailVerification}>Verify OTP</button>
                    </div>
                )}
                {isEmailVerified && (
                    <button className="post" onClick={handlePostToTwitter}>Post to Twitter</button>
                )}
            </header>
        </div>

    );
};

export default AudioRecorder;
