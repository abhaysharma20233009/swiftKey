
import './App.css';

function App() {
    const [message,setMessage]=useState('');
  const fetchMessages = async () => {
    try {
        const response = await fetch('http://localhost:7000/random-paragraph');
        const data = await response.json();
        setMessages(data);

        // Update online users
        const newUsers = data.map(msg => msg.user); // Extract users from messages
        setOnlineUsers(prevUsers => [
            ...new Set([...prevUsers, ...newUsers]) // Add only unique users
        ]);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

  return (
    <div>
   
   <input
                    type="text"
                    placeholder="Your name"
                    
                />
     
    </div>
  );
}

export default App;
