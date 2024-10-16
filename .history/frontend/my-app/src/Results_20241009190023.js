// Results.js
import React from 'react';
function Results({data}) {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Results</h1>
            <p>Your typing results will be displayed here.</p>
            <p>{data}</p>

        </div>
    );
}

export default Results;
