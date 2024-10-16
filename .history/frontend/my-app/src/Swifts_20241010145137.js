import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Swifts() {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [time, setTime] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve username from location state
    const username = location.state?.username||'';

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
                navigate('/results', { state: { currentWordIndex, username } }); // Pass both currentWordIndex and username
            }, time * 1000);
        
            return () => clearTimeout(timer);
        }
    }, [time, currentWordIndex, navigate, username]);

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
            {username && <h2>Welcome, {username}!</h2>}
            <button className="log" onClick={() => navigate('/login')}>Login</button>
            <br/>
            <button onClick={fetchMessages}>Fetch New Text</button>
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
                            color: index === currentWordIndex ? 'blue' : 'white',
                            textDecoration: index < currentWordIndex ? 'line-through' : 'none',
                        }}
                    >
                        {word}
                    </span>
                ))}
            </div>
            <button>{currentWordIndex}</button>
            <h1>Set timer</h1>
            <button onClick={() => setTime(30)}>30</button>
            <button onClick={() => setTime(60)}>60</button>
        </div>
    );
}

export default Swifts;
