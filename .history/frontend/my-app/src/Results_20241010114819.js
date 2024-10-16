import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const currentWordIndex = location.state?.currentWordIndex || 0; // Get currentWordIndex from state

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Results</h1>
            <p>Your typing results will be displayed here.</p>
            <p>{username}: {currentWordIndex}</p>
        </div>
    );
}

export default Results;
