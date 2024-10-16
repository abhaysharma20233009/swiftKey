import React, { useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:7000/random-paragraph');
            const data = await response.json();
            setMessage(data); // Assume data is a string paragraph
            setInputValue(''); // Clear the input field when fetching new text
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <button onClick={fetchMessages}>Fetch New Text</button>
            <div style={{ fontSize: '24px', margin: '20px 0' }}>
                {message}
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
                placeholder="Start typing..."
            />
        </div>
    );
}

export default App;
