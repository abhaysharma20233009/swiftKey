//App.js

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import swift from './swift';
import Results from './Results';

const App = () => {
    return (
        <Router>
			<div className="App">
            <Routes>
                <Route path="/" element={<swift/>} />
                <Route path="/results" element={<Results />} />
            </Routes>
			</div>
        </Router>
    );
};

export default App;
