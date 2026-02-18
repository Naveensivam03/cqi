import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await loginUser(username, password);

        if (result && result.success) {
            localStorage.setItem('user', JSON.stringify(result.user));
            navigate('/dashboard');
        } else {
            setError(result.message || 'Invalid username or password');
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <div className="login-header">
                    <h1>Teacher & Admin Login</h1>
                    <p>Sign in to access course curriculum</p>
                </div>
                <form onSubmit={handleLogin} id="loginForm">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Sign In</button>

                    {error && <div className="error-message" style={{ display: 'block', marginTop: '1rem' }}>{error}</div>}
                </form>
                <div style={{ marginTop: '30px', fontSize: '0.8em', color: '#86868b', textAlign: 'center' }}>
                    <p>Demo Account: admin / password123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
