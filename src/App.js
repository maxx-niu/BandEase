import logo from './logo.svg';
import './App.css';
import './components/registration/landing-registration'
import LandingRegistration from './components/registration/landing-registration';
import Login from './components/login/login';
import Logout from './components/login/logout';
import UserProfile from './components/profile/user-profile';
import {BrowserRouter, Routes, Route, Link, NavLink} from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const {isAuthenticated, user} = useAuth();
  // asdfsadf
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Sign Up!</NavLink>
        <NavLink to="/profile">profile</NavLink>
      </nav>
      <h1>BandEase</h1>
      <Routes>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/register" element={<LandingRegistration></LandingRegistration>}/>
        <Route path="/profile" element={<UserProfile></UserProfile>}/>
      </Routes>
      {isAuthenticated && <Logout></Logout>}
      {user && <p>Welcome, {user.uid}</p>}
    </div>
  );
}

export default App;
