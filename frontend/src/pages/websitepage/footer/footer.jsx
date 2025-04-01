import React from "react";
import "./footer.css"; 
function Footer() {
  return (
    <footer className="home-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are a company dedicated to providing efficient financial
            solutions. We specialize in incorporating mobile money transfer
            solutions and help our clients save their money by automating their
            savings after agreering on the saving amount.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Mobile Transfers</a>
            </li>
            <li>
              <a href="#">Automated Savings</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@yourcompany.com</p>
          <p>Phone: +1 123 456 7890</p>
          <p>Address: 123 Financial Avenue, City, Country</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;