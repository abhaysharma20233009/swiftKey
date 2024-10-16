import React, { useState, useEffect } from 'react';

function Swifts(){
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [time,setTime]=useState('');
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
        }, time * 1000); // Convert seconds to milliseconds
    
        return () => clearTimeout(timer);
    }, [time]); // Include time here
    

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
                        <button onClick={setTime(30)}>30</button>
                    </div>
        
    );
};

export default Swifts;
