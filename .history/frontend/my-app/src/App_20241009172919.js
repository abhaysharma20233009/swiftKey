import React, { useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:7000/random-paragraph');
            const data = await response.json(); // Parse the JSON response
            setMessage(data); // Assuming data is the string you want to set
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder={message} // Set placeholder to message
            />
            <button onClick={fetchMessages}>Click</button> {/* Call fetchMessages directly */}
        </div>
    );
}

export default App;
