import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LandingRegistration from '../registration/landing-registration';
import Login from '../login/login';
import Logout from '../login/logout';
import UserProfile from '../profile/user-profile';
import ProfileDashboardButton from '../profile/profile-dashboard-button';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {isAuthenticated, user} = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {!isAuthenticated && <NavLink to="/register">Sign Up!</NavLink>}
        {isAuthenticated && (
          <NavLink to="/profile">
            <ProfileDashboardButton/>
          </NavLink>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/register" element={<LandingRegistration></LandingRegistration>}/>
        <Route path="/profile" element={<UserProfile></UserProfile>}/>
      </Routes>
      {user && <Logout></Logout>}
      {user && <p>Welcome, {user.uid}</p>}
    </>
  );
};

export default Navbar;
