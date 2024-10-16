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
      <div >
      <Swifts setData={setData}/>
      <Results data={data}/>
    </div>
    );
};

export default App;
