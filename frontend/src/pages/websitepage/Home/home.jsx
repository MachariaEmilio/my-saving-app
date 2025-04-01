import React, { useState, useEffect } from "react";
import Body_code from "../body/body";
import Footer from "../footer/footer";
import Header from "../header/Header";
import Services from "../services/services";
import "./home.css";
import AboutUs from "../about/AboutUs";
import Portfolio from "../portfolio/portfolio";
import Login from "../Login/login";
import Signup from "../signup/signup";
import { useNavigate } from "react-router-dom";

function Home() {
  const [activePage, setActivePage] = useState("home");

  const navigate = useNavigate();

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  const handleLogin = (userData) => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setActivePage("home");
  };

  const handleLoginClick = () => {
    setActivePage("login");
  };

  const handleSignupClick = () => {
    setActivePage("signup");
  };

  const renderPageContent = () => {
    switch (activePage) {
      case "home":
        return <Body_code onSignupClick={handleSignupClick} />;
      case "about":
        return <AboutUs />;
      case "services":
        return <Services />;
      case "portfolio":
        return <Portfolio />;
      case "login":
        return <Login onLogin={handleLogin} onSignup={handleSignupClick} />;
      case "signup":
        return <Signup onLoginClick={handleLoginClick} />;
      default:
        return <Body_code />;
    }
  };

  return (
    <div className="home-container">
      <Header onNavClick={handleNavClick} activePage={activePage} />
      <div className="home-body-and-footer">
        {renderPageContent()}
        <Footer />
      </div>
    </div>
  );
}

export default Home;
