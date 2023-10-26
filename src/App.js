import logo from './logo.svg';
import './App.css';
import './components/registration/landing-registration'
import LandingRegistration from './components/registration/landing-registration';
import Login from './components/login/login';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>BandEase</h1>
      <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<LandingRegistration></LandingRegistration>}></Route>
      </Routes>
    </div>
  );
}

export default App;
