import './App.css';
import './components/registration/landing-registration'
import Navbar from './components/nav/navbar';
import { Routes, Route } from 'react-router-dom';
import LandingRegistration from './components/registration/landing-registration';
import Login from './components/login/login';
import UserProfile from './components/profile/user-profile';
import Fretboard from './components/fretboard/fretboard';

const App = () => {
  
  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>FretFlow</h1>
      <Routes>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/register" element={<LandingRegistration></LandingRegistration>}/>
        <Route path="/profile" element={<UserProfile></UserProfile>}/>
        <Route path="/fretboard" element={<Fretboard></Fretboard>}/>
      </Routes>
    </div>
  );
}

export default App;
