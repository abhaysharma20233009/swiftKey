import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Results from './Results'; // Import the Results component

function App() {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:7000/random-paragraph');
            const data = await response.json();
            setMessage(data);
            setInputValue('');
            setCurrentWordIndex(0);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/results'; // Redirect to /results
        }, 60000); // 60 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const words = message.split(' ');
        const currentWord = words[currentWordIndex];

        if (currentWord.startsWith(value.trim())) {
            if (value.trim() === currentWord) {
                setCurrentWordIndex((prevIndex) => prevIndex + 1);
                setInputValue('');
            }
        }
    };

    const words = message.split(' ');
    const currentWord = words[currentWordIndex] || '';

    return (
        <Router>
        
                
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
                                        color: index === currentWordIndex ? 'blue' : 'black',
                                        textDecoration: index < currentWordIndex ? 'line-through' : 'none',
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                        <button>{currentWordIndex}</button>
                    </div>
                    <Routes>
                <Route path="/results" component={Results} />
            
            </Routes>
        </Router>
    );
}

export default App;
