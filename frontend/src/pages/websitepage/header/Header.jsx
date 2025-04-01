import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header({ onNavClick, activePage }) {

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = (page) => {
    if (onNavClick) {
      onNavClick(page);
    }
    setIsNavOpen(false);
  };

  return (
    <header className="home-header">
      <div className="home-logo-container">
        <img src="/assets/icon.jpg" alt="Logo" width="40" height="40" />
      </div>
      <nav className="home-nav">
        <div className="home-nav-middle">
          <div className="home-menu-icon" onClick={toggleNav}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
          <div className={`home-nav-content ${isNavOpen ? "active" : ""}`}>
            <ul className="home-nav-links">
              <li>
                <a
                  href="#"
                  onClick={() => handleLinkClick("home")}
                  className={activePage === "home" ? "active" : ""}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleLinkClick("about")}
                  className={activePage === "about" ? "active" : ""}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleLinkClick("services")}
                  className={activePage === "services" ? "active" : ""}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleLinkClick("portfolio")}
                  className={activePage === "portfolio" ? "active" : ""}
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  // onClick={() => handleLinkClick("contact")}
                  className={activePage === "contact" ? "active" : ""}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  // onClick={() => handleLinkClick("blog")}
                  className={activePage === "blog" ? "active" : ""}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="home-auth-buttons">
        <button
          className="home-login-button"
          onClick={() => handleLinkClick("login")}
        >
          Login
        </button>
        <button
          className="home-register-button"
          onClick={() => handleLinkClick("signup")}
        >
          {" "}
          Register
        </button>
      </div>
    </header>
  );
}

export default Header;
