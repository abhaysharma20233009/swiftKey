import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const word_typed = location.state?.currentWordIndex || 0; // Get currentWordIndex from state
    const username = location.state?.username || '';
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false); // Flag to track fetch status

    useEffect(() => {
        const fetchData = async () => {
            if (hasFetched) return; // Prevent multiple fetches

            setHasFetched(true); // Set flag to true

            try {
                const response = await fetch('http://localhost:7000/check-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });

                if (response.ok) {
                    await fetch('http://localhost:7000/update-info', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, word_typed }),
                    });
                } else {
                    setError('User check failed');
                }
            } catch (error) {
                setError('Error logging in: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username, word_typed, hasFetched]); // Added hasFetched to the dependency array

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Results</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <>
                    <p>Your typing results will be displayed here.</p>
                    <p>{username}: {word_typed}</p>
                </>
            )}
        </div>
    );
}

export default Results;
