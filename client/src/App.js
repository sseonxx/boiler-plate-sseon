import React from "react";
import { BrowserRouter as Router, 
         Routes, 
         Route, 
         Link 
        } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Footer from "./components/views/Footer/Footer";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            
            <li>
              <Link to="/">메인화면</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/register">등록하기</Link>
            </li>
            <li>
              <Link to="/footer">푸터</Link>
            </li>
            
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/register" element={<RegisterPage />}></Route>
          <Route exact path="/footer" element={<Footer />}></Route>
        </Routes>

      </div>
    </Router>

  );

}
