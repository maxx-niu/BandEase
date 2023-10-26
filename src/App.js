import logo from './logo.svg';
import './App.css';
import './components/registration/landing-registration'
import LandingRegistration from './components/registration/landing-registration';
import Login from './components/login/login';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <LandingRegistration></LandingRegistration>
    // </div>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Login</Link>
          </li>
        </ul>
      </nav>
      <Route path="/login" Component={Login}></Route>
      <Route path="/register" Component={LandingRegistration}></Route>
    </Router>

  );
}

export default App;
