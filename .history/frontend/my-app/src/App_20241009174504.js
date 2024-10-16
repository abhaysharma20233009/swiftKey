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

        
        const currentWord = message;

        // Check if the typed characters match the current word
        if (currentWord.startsWith(value.trim())) {
            if (value.trim() === currentWord) {
                setCurrentWordIndex((prevIndex) => prevIndex + 1);
                setInputValue(''); // Clear the input field
            }
        } 
    };

    const words = message.split(' ');
    const currentWord = words[currentWordIndex] || '';

    return (
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
                placeholder={currentWord.slice(inputValue.length)} // Show remaining characters
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
        </div>
    );
}

export default App;
