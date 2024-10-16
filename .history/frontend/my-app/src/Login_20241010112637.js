import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:7000/user-data');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            // Handle the response here if needed
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const log = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setErrorMessage(''); // Clear previous errors
        try {
            const response = await fetch('http://localhost:7000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || errorData.error); // Set error message
                return;
            }

            setUsername('');
            setEmail('');
            setPassword('');
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('An unexpected error occurred.'); // General error message
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUser();
            navigate('/', { state: { username } });
        }
    }, [isLoggedIn, navigate, username]);

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
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log in'}
                </button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Error message display */}
        </div>
    );
};

export default Login;
