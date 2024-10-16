//App.js

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import swift from './swift';
import results from './Results';

const App = () => {
    return (
        <Router>
			<div className="App">
            <Routes>
                <Route path="/" element={<ChatRoom />} />
                <Route path="/results" element={<Register />} />
            </Routes>
			</div>
        </Router>
    );
};

export default App;
