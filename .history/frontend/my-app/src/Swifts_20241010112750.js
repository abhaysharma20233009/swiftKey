import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Swifts = () => {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [time, setTime] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchMessages = async () => {
        setError(''); // Clear any previous errors
        try {
            const response = await fetch('http://localhost:7000/random-paragraph');
            const data = await response.json();
            if (typeof data === 'string') {
                setMessage(data);
                setInputValue('');
                setCurrentWordIndex(0);
                setTime(0); // Reset time when fetching new message
            } else {
                setError('Invalid data format.');
            }
        } catch (error) {
            setError('Error fetching messages. Please try again.');
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => {
                navigate('/results', { state: { currentWordIndex } });
            }, time * 1000);

            return () => clearTimeout(timer);
        }
    }, [time, currentWordIndex, navigate]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const words = message.split(' ');
        const currentWord = words[currentWordIndex];

        if (currentWord && currentWord.startsWith(value.trim())) {
            if (value.trim() === currentWord) {
                setCurrentWordIndex((prevIndex) => prevIndex + 1);
                setInputValue('');
            }
        }
    };

    const words = message.split(' ');
    const currentWord = words[currentWordIndex] || '';

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={fetchMessages}>Fetch New Text</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message display */}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                style={{
                    fontSize: '24px',
                    width: '80%',
                    padding: '10px',
                    margin: '20px 0',
                }}
                placeholder={currentWord.slice(inputValue.length)}
            />
            <div style={{ fontSize: '24px', marginTop: '10px' }}>
                {words.map((word, index) => (
                    <span
                        key={index}
                        style={{
                            padding: '0 5px',
                            color: index === currentWordIndex ? 'blue' : 'black',
                            textDecoration: index < currentWordIndex ? 'line-through' : 'none',
                        }}
                    >
                        {word}
                    </span>
                ))}
            </div>
            <h2>Current Word Index: {currentWordIndex}</h2>
            <h1>Set Timer</h1>
            <button onClick={() => setTime(30)}>30 seconds</button>
            <button onClick={() => setTime(60)}>60 seconds</button>
            {time > 0 && <p>Time set: {time} seconds</p>} {/* Display set time */}
        </div>
    );
};

export default Swifts;
