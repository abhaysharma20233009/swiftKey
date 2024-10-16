//App.js

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Swift from './Swifts';
import Results from './Results';

const App = () => {
  const [data,setData]=useState('')''
    return (
        <Router>
			<div className="App">
            <Routes>
                <Route path="/" element={<Swift />} />
                <Route path="/results" element={<Results />} />
            </Routes>
			</div>
        </Router>
    );
};

export default App;
