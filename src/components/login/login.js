import React, {useState} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // on a successful login
            const user = userCredential.user;
            console.log('Logged in as:', user.displayName);
        } catch (e) {
            // on a failed login
            console.log('Login failed:', e.message);
            // TODO: replace with better user messsage
        };
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