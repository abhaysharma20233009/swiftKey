import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [message,setMessage]=useState('');
  const fetchMessages = async () => {
    try {
        const response = await fetch('http://localhost:7000/random-paragraph');
        const data = await response.json();
        setMessage(data);

     
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

  return (
    <div>
   
   <input
                    type="text"
                    placeholder="Your name"
                    
                />
     
    </div>
  );
}

export default App;
