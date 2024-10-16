//App.js
import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Results from './Results';
import Swifts from './Swifts';


const App = () => {
  const [data,setData]=useState('');
    return (
        <Router>
			<div className="App">
            <Routes>
            <Route path="/results" element={<Results />} />
                <Route path="/" element={<Swifts />} />
              
            </Routes>
			</div>
        </Router>
    );
};

export default App;
