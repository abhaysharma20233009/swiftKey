//App.js

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Swift from './Swifts';
import Results from './Results';
import Login from './Login';
import Signup from './Signup';
const App = () => {
    return (
        <Router>
			<div className="App">
            <Routes>
                <Route path="/" element={<Swift />} />
                <Route path="/results" element={<Results />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
			</div>
        </Router>
    );
};

export default App;
