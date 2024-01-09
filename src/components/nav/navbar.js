import './navbar.css';
import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileDashboardButton from '../profile/profile-dashboard-button';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/BandEase.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated, user} = useAuth();
  const [navMenuHeight, setNavMenuHeight] = useState(0);
  const navMenuHeightRef = useRef();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (navMenuHeightRef.current) {
        setNavMenuHeight(navMenuHeightRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <div className={isOpen ? "side-bar-blocker active" : "side-bar-blocker"} onClick={toggleMenu} style={{top: navMenuHeight}}/>
      <nav className="nav-links" ref={navMenuHeightRef}>
        <div className="hamburger-menu" onClick={toggleMenu}>
            <span/>
            <span/>
            <span/>
        </div>
        {/* Routes Here */}
        <NavLink to="/" className="nav-home-logo">
            <img src={logo} alt='logo'></img>
        </NavLink>
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {!isAuthenticated && <NavLink to="/register">Sign Up!</NavLink>}
        {isAuthenticated && (
          <NavLink to="/profile" className="nav-profile-button">
            <ProfileDashboardButton/>
          </NavLink>
        )}
      </nav>
      {/* Slide out menu */}
      <nav className={isOpen ? "side-bar active" : "side-bar"} style={{top: navMenuHeight}}>
        <ul className="side-bar-items">
            <li className="side-bar-item">
              <NavLink to="/fretboard" onClick={toggleMenu} className={
                ({isActive}) => {
                  return isActive ? "is-active" : "";
                }
              }>Interactive Fretboard</NavLink>
            </li>
            <li className="side-bar-item">
              <NavLink to="/" onClick={toggleMenu} className={
                ({isActive}) => {
                  return isActive ? "is-active" : "";
                }
              }>I am link 1</NavLink>
            </li>
            <li className="side-bar-item">
              <NavLink to="/" onClick={toggleMenu} className={
                ({isActive}) => {
                  return isActive ? "is-active" : "";
                }
              }>I am link 1</NavLink>
            </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
