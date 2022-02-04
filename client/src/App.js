import React from "react";
import { BrowserRouter as Router, 
         Routes, 
         Route, 
         Link 
        } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">About</Link>
            </li>
            <li>
              <Link to="/register">Users</Link>
            </li>
            
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/register" element={<RegisterPage />}></Route>
        </Routes>

      </div>
    </Router>

  );

}
