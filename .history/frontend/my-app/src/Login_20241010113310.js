
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:7000/user-data'); // Endpoint to fetch user data
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            // Handle the response here if needed
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const log = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch('http://localhost:7000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }), // Use the correct field name
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || errorData.error);
                return;
            }

            // Clear fields and set logged in state
            setUsername('');
            setEmail('');
            setPassword('');
            setIsLoggedIn(true); // Set logged in state to true

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUser(); // Fetch user data only if logged in
            navigate('/',{state:{username}}); // Redirect after successful login
        }
    }, [isLoggedIn, navigate,username]); // Dependency on isLoggedIn

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={log}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default Login;