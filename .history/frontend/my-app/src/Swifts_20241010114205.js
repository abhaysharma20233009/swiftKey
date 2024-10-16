import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Swifts() {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [time, setTime] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Get the username from the location state
    const username = location.state?.username;

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:7000/random-paragraph');
            const data = await response.json();
            if (data && typeof data === 'string') {
                setMessage(data);
                setInputValue('');
                setCurrentWordIndex(0);
            } else {
                console.error('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => {
                navigate('/results', { state: { currentWordIndex, username } }); // Pass currentWordIndex and username to results
            }, time * 1000);

            return () => clearTimeout(timer);
        }
    }, [time, currentWordIndex, username, navigate]);

    // Handle input change and other functionalities...

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Welcome, {username}!</h2>
            {/* Rest of your component */}
        </div>
    );
}

export default Swifts;
