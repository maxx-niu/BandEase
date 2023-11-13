import React, { createContext, useContext, useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // on a successful login
            const user = userCredential.user;
            console.log(`logged in as: ${user.email}`);
            alert(`logged in as: ${user.email}`);
            setIsAuthenticated(true);
        } catch (e) {
            // on a failed login
            alert('Login failed:', e.message);
            // TODO: replace with better user messsage
        };
    };
    
    const logoutUser = async () => {
        try {
            await signOut(auth);
            setIsAuthenticated(false);
        } catch (e) {
            // on a failed logout
            alert('Logout failed:', e.message);
            // TODO: replace with better user messsage
        };
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};