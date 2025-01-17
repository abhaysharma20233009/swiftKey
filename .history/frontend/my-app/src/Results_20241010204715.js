import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const [info, setInfo] = useState([]);
    const location = useLocation();
    const wordTyped = location.state?.wordTyped || 0; // Get currentWordIndex from state
    const username = location.state?.username || '';
    const email=location.state?.email||'';
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
                        body: JSON.stringify({ username,email, wordTyped }),
                    });
                    await fetchUser(); // Fetch updated user data
               
                } catch (error) {
                    console.error('Error saving results:', error);
                }
            }
            else {
                alert("login first to save ")
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
        <div className="form" style={{ textAlign: 'center', marginTop: '0px' }}>
            <h3>Results for {username}</h3> {/* Display username here */}
            <h2>{wordTyped} WPM</h2>
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
