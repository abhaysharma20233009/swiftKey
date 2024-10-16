const log = async () => {
    try {
        const response = await fetch('http://localhost:7000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username, email, password }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || errorData.error);
            return;
        }

        // Reset fields
        setUsername('');
        setPassword('');

        // Navigate to Swifts with username
        navigate('/swifts', { state: { username } });

    } catch (error) {
        console.error('Error login:', error);
    }
}
