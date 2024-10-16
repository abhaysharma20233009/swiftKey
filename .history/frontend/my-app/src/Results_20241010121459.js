import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const word_typed= location.state?.currentWordIndex || 0; // Get currentWordIndex from state
    const username =location.state?.username||'';
    const fun=async ()=>{
        try {
            const response = await fetch('http://localhost:7000/check-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username}),
            });
            
            if (response.ok) {
                
            }
    
    
        } catch (error) {
            console.error('Error login:', error);
        }
    }
    
         fun();
    
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Results</h1>
            <p>Your typing results will be displayed here.</p>
            <p>{username}: {word_typed}</p>
        </div>
    );
}

export default Results;
