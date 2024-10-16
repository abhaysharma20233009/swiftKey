import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const word_typed= location.state?.currentWordIndex || 0; // Get currentWordIndex from state
    const username =location.state?.username||'';
    const fetchUser = async () => {
        try {
            await fetch('http://localhost:7000/update-info');
            
        } catch (error) {
            console.error('Error fetching info:', error);
        }
    };
    const fun=async ()=>{
        try {
           
            const response = await fetch('http://localhost:7000/check-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username}),
            });
            
            if (response.ok) {
              try{
                  await fetch('http://localhost:7000/update-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username,word_typed}),
            });
            await fetchUser();
        }catch(error){
            console.error(error);
        }
            }
    
    
        } catch (error) {
            console.error('Error login:', error);
        }
    }
      
    
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Results</h1>
            <p>Your typing results will be displayed here.</p>
            <p>{username}: {word_typed}</p>
            <button onClick={fun}>save</button>
        </div>
    );
}

export default Results;
