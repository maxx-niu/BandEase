import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { useAuth } from './AuthContext'; // adjust the path according to your file structure
import { database } from '../firebase';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const { user } = useAuth();

  const [userProfileData, setUserProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    country: "",
    avatarURL: ""
  });

  useEffect(() => {
    let userRef;
    if (user) { // Check if user is not null
      userRef = ref(database, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserProfileData(data);
        }
      });
    }
    return () => {
      if (userRef) {
        off(userRef);
      }
    };
  }, [user]); // Depend on user so the effect runs again if it changes

  return (
    <UserProfileContext.Provider value={{ userProfileData, setUserProfileData }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileData = () => {
    return useContext(UserProfileContext);
};
