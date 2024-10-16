// Results.js
import React from 'react';
import swift from 'Swifts';
function Results({data}) {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Results</h1>
            <p>Your typing results will be displayed here.</p>
            <p>{currentWordIndex}</p>

        </div>
    );
}

export default Results;
