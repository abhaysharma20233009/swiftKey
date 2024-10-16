//App.js

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatRoom from './swift';
import Register from './Results';

const App = () => {
    return (
        <Router>
			<div className="App">
            <Routes>
                <Route path="/" element={<swift />} />
                <Route path="/register" element={<Register />} />
            </Routes>
			</div>
        </Router>
    );
};

export default App;
