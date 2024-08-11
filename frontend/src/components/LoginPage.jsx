import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const credentials = { email, password };
            const userRole = await login(credentials);

            if (userRole) {

                const userData = { email, role: localStorage.getItem('role') };
                localStorage.setItem('user', JSON.stringify(userData));

                switch (userData.role) {
                    case 'sales':
                        navigate('/sales');
                        break;
                    case 'accountant':
                        navigate('/accountant');
                        break;
                    case 'hr':
                        navigate('/hr');
                        break;
                    case 'admin':
                        navigate('/admin');
                        break;
                    default:
                        navigate('/unauthorized');
                }
            } else {
                setError('Invalid login credentials');
            }
        } catch (error) {
            setError('An error occurred during login');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;