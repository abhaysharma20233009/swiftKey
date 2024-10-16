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
    const username = location.state?.username || '';

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
                navigate('/results', { state: { currentWordIndex, username } });
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

    // Function to chunk words into lines of 10 words each
    const chunkWords = (words, chunkSize) => {
        const result = [];
        for (let i = 0; i < words.length; i += chunkSize) {
            result.push(words.slice(i, i + chunkSize));
        }
        return result;
    };

    const chunkedWords = chunkWords(words, 20); // Chunk words into groups of 10

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {username && <h2>Welcome, {username}!</h2>}
            <button className="log" onClick={() => navigate('/login')}>Login</button>
            <br />
            <button className="log" onClick={fetchMessages}>Fetch New Text</button>
            <br />
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
            <div style={{ fontSize: '24px', marginTop: '10px', textAlign: 'center' }}>
                {chunkedWords.map((line, lineIndex) => (
                    <div key={lineIndex} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {line.map((word, index) => {
                            const wordIndex = lineIndex * 20 + index; // Calculate the global index
                            const isCurrentWord = wordIndex === currentWordIndex;
                            const isTypedWord = wordIndex < currentWordIndex;

                            return (
                                <span
                                    key={wordIndex}
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
                ))}
            </div>
            <h1>Set timer</h1>
            <button className="log" onClick={() => setTime(30)}>30</button>
            <button className="log" onClick={() => setTime(60)}>60</button>
        </div>
    );
}

export default Swifts;
