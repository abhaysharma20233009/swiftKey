import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Swifts() {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [time, setTime] = useState(0);
    const [countdown, setCountdown] = useState(0);
    const [wordTyped, setWordTyped] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const username = location.state?.username || '';
    const email = location.state?.email || '';

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
        let timer;
        if (time > 0) {
            setCountdown(time);
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        navigate('/results', { state: { wordTyped, username, email } });
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [time, navigate, wordTyped, username, email]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const words = message.split(' ');
        const currentWord = words[currentWordIndex];

        if (currentWord && currentWord.startsWith(value.trim())) {
            if (value.trim() === currentWord) {
                setCurrentWordIndex((prevIndex) => {
                    setWordTyped((prev) => prev + 1); // Increment word count
                    return prevIndex + 1;
                });
                setInputValue('');
            }
        }
    };

    const words = message.split(' ');
    const currentWord = words[currentWordIndex] || '';

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div className="Timer">{countdown}</div>
            {username && <h2>Welcome, {username}!</h2>}
            <button className="log" onClick={() => navigate('/login')}>Login</button>
            <button className="log" onClick={() => navigate('/signup')}>Signup</button>
            <br />
            <button className="logs" onClick={fetchMessages}>Fetch New Text</button>
            <br />
            <input
                className='in'
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={currentWord.slice(inputValue.length)}
            />
            <div className="lo">
                <div style={{ fontSize: '24px', marginTop: '10px', textAlign: 'center', display: 'flex', flexWrap: 'wrap' }}>
                    {words.map((word, index) => {
                        const isCurrentWord = index === currentWordIndex;
                        const isTypedWord = index < currentWordIndex;

                        return (
                            <span
                                key={index}
                                style={{
                                    padding: '0 5px',
                                    color: isCurrentWord ? 'blue' : (isTypedWord ? 'gray' : 'white'),
                                    textDecoration: isTypedWord ? 'line-through' : 'none',
                                }}
                            >
                                {word}
                            </span>
                        );
                    })}
                </div>
            </div>
            <h1>Set timer</h1>
            <button className="log" onClick={() => setTime(30)}>30</button>
            <button className="log" onClick={() => setTime(60)}>60</button>
        </div>
    );
}

export default Swifts;
