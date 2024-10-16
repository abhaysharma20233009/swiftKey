import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const word_typed = location.state?.currentWordIndex || 0;
    const username = location.state?.username || '';
    const [hasUpdated, setHasUpdated] = React.useState(false);

    const fun = async () => {
        if (hasUpdated) return; // Prevent duplicate execution

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
                setHasUpdated(true); // Mark as updated
            }
        } catch (error) {
            console.error('Error login:', error);
        }
    };

    React.useEffect(() => {
        fun();
    }, []); // Only run once when the component mounts

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Results</h1>
            <p>Your typing results will be displayed here.</p>
            <p>{username}: {word_typed}</p>
        </div>
    );
};

export default Results;
