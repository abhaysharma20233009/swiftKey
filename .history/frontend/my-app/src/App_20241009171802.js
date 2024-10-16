
import './App.css';

function App() {



  return (
    <div>
   
   <input
                    type="text"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
     
    </div>
  );
}

export default App;
