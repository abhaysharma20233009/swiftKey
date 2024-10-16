import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const [info, setInfo] = useState([]);
    const location = useLocation();
    const wordTyped = location.state?.currentWordIndex || -1; // Get currentWordIndex from state
    const username = location.state?.username || '';

    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:7000/update_info');
            const data = await response.json();
            // Filter data for the specific user
            const userData = data.filter((msg) => msg.username === username);
            setInfo(userData);
        } catch (error) {
            console.error('Error fetching info:', error);
        }
    };

    const saveResults = async () => {
        try {
            const response = await fetch('http://localhost:7000/check-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (response.ok) {
                try {
                    await fetch('http://localhost:7000/update_info', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, wordTyped }),
                    });
                    await fetchUser(); // Fetch updated user data
                } catch (error) {
                    console.error('Error saving results:', error);
                }
            }
        } catch (error) {
            console.error('Error checking user:', error);
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Results for {username}</h1> {/* Display username here */}
            <h2>{wordTyped}</h2>
            <p>Your typing results will be displayed below:</p>
            <ul>
                {info.map((msg) => (
                    msg.words_typed.map((wordObj, index) => (
                        <li key={`${msg._id}-${index}`}>
                            <strong>   {wordObj.word}            :</strong>{new Date(wordObj.timestamp).toLocaleString()}
                        </li>
                    ))
                ))}
            </ul>
            <button className ="log" onClick={saveResults}>Save</button>
        </div>
    );
}

export default Results;
