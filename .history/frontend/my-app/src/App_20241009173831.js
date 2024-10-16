import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:7000/random-paragraph');
            const data = await response.json();
            setMessage(data); // Assume data is a string paragraph
            setInputValue(''); // Clear the input field
            setCurrentWordIndex(0); // Reset the current word index
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Check if the typed word matches the current word
        const words = message.split(' ');
        if (value.trim() === words[currentWordIndex]) {
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
            setInputValue(''); // Clear the input field
        }
    };

    const words = message.split(' ');

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={fetchMessages}>Fetch New Text</button>
            <div style={{ fontSize: '24px', margin: '20px 0' }}>
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
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                style={{
                    fontSize: '24px',
                    width: '80%',
                    padding: '10px',
                }}
                placeholder="Type here..."
            />
        </div>
    );
}

export default App;
