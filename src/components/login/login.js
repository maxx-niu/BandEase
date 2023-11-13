import React, {useState} from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticated, loginUser} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser(email, password);
    };

    return(
        <div>
            <form onSubmit={handleLogin}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );

};

export default Login;