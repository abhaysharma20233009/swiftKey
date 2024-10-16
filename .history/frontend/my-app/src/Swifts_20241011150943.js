import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Swifts() {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [time, setTime] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [countdown, setCountdown] = useState(0);
    const [wordTyped, setWordTyped] = useState(0);
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const username = location.state?.username || '';
    const email = location.state?.email || '';

    useEffect(() => {
        fetchMessages();
        pro(); // Check session on mount
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:7000/random-paragraph');
            const data = await response.json();
            if (data && typeof data === 'string') {
                setMessage(data);
                setInputValue('');
                setCurrentWordIndex(0);
                setIsInputDisabled(false);
            } else {
                console.error('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const pro = async () => {
        const response = await fetch('http://localhost:7000/protected-route', {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Not authorized to access the protected route.');
        }
    };

    const signout = async () => {
        try {
            const response = await fetch('http://localhost:7000/signup', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || errorData.error);
                return;
            }
            // Optionally navigate to login page or clear state
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

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

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (countdown === 0) {
            setIsInputDisabled(true);
        }
    }, [countdown]);

    useEffect(() => {
        if (time > 0) {
            setWordTyped((currentWordIndex * 60) / time);
            const timer = setTimeout(() => {
                navigate('/results', { state: { wordTyped, username, email } });
            }, time * 1000);

            return () => clearTimeout(timer);
        }
    }, [time, currentWordIndex, wordTyped, navigate, username, email]);

    const words = message.split(' ');
    const currentWord = words[currentWordIndex] || '';

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div className="Timer">{countdown}</div>
            {username && <h2>Welcome, {username}!</h2>}
            <button className="log" onClick={() => navigate('/login')}>Login</button>
            <button className="log" onClick={() => navigate('/signup')}>Sign Up</button>
            <button className="log" onClick={signout}>Sign Out</button>
            <button className="log" onClick={pro}>Check Protected Route</button>
            <br />
            <button className="logs" onClick={fetchMessages}>Fetch New Text</button>
            <br />
            <input
                className='in'
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={currentWord.slice(inputValue.length)}
                disabled={isInputDisabled}
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
