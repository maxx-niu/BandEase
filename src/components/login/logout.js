import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Logout = () => {

    const {logoutUser} = useAuth();

    const handleLogout = async (e) => {
        await logoutUser();
    }

  return (
    <>
        <button onClick={handleLogout}>
            Log Out
        </button>
    </>
  )
}

export default Logout