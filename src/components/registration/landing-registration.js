import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

function LandingRegistration() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegistration = async (e) => {
        e.preventDefault();

        // TODO: handle signup with firebase.
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user.email
            console.log(user);
            alert('registration successful!');
            // TODO: add the username field in the DB
        })
        .catch(
            (err) => {
            console.error(err);
        })

    }

  return (
    <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleRegistration}>
            <div className='registration-input-username'>
                <label htmlFor="username">Username: </label>
                <input type="text" 
                id="username" 
                value={username}
                required
                onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
            </div>
            <div className='registration-input-email'>
                <label htmlFor="email">Email: </label>
                <input type="email" 
                id="email" 
                value={email}
                required
                onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
            </div>
            <div className='registration-input-password'>
                <label htmlFor="password">Password: </label>
                <input type="password" 
                id="password" 
                value={password}
                required
                onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
            </div>
            <div className="registration-submit-button">
                <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
  );
}

export default LandingRegistration;