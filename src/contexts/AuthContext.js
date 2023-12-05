import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // represents if the user is logged in or not
    
    const [user, setUser] = useState(null); // represents the user object (e.g. user.email would give you the user's email
    // after they log in)

    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // on a successful login
            const user = userCredential.user;
            console.log(`logged in as: ${user.email}`);
            alert(`logged in as: ${user.email}`);
            //setIsAuthenticated(true);
        } catch (e) {
            // on a failed login
            alert('Login failed:', e.message);
            // TODO: replace with better user messsage
        };
    };
    
    const logoutUser = async () => {
        try {
            await signOut(auth);
            //setIsAuthenticated(false);
        } catch (e) {
            // on a failed logout
            alert('Logout failed:', e.message);
            // TODO: replace with better user messsage
        };
    };

    useEffect(() => {
        // Set up the listener on auth state change
        const unsubscribe = auth.onAuthStateChanged(user => {
          // If the user object is defined, the user is authenticated
          setIsAuthenticated(!!user);
          if (user) {
            setUser(user);
          } else {
            setUser(null);
          }
        });
    
        // Clean up the listener on unmount
        return () => unsubscribe();
      }, []); // Empty dependency array means this effect runs once on mou

    return (
        <AuthContext.Provider value={{isAuthenticated, user, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};