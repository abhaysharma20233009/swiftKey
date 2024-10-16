//App.js
import  useState from 'react';
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
            {/* <Routes>
           
                <Route path="/" element={<Swifts />} />
                <Route path="/results" element={<Results />} />
            </Routes>
            <div > */}
              <Swifts setData={setData}/>
              <Results data={data}/>
            </div>
			</div>
        </Router>
    );
};

export default App;
