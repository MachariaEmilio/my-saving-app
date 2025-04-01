import React from 'react';
import './Body.css'; // Create a Body.css file for styling
import AboutUs from '../about/AboutUs';

function Body_code({onSignupClick}) {
  return (
    <main className="body-main">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Efficient Financial Solutions at Your Fingertips</h1>
          <p>
            Experience seamless mobile money transfers and automate your savings
            for a brighter financial future.
          </p>
          <button className="signup-button" onClick={onSignupClick}>
            Sign Up for Free
          </button>
        </div>
      </section>
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Mobile Transfers</h3>
            <p>Send and receive money instantly.</p>
          </div>
          <div className="feature">
            <h3>Automated Savings</h3>
            <p>Effortlessly save money with automated plans.</p>
          </div>
          <div className="feature">
            <h3>Financial Insights</h3>
            <p>Track your spending and savings with detailed reports.</p>
          </div>
        </div>
      </section>
      <AboutUs />
      <section className="call-to-action">
        <h2>Ready to Get Started?</h2>
        <p>Join our community and take control of your finances.</p>
        <button className="get-started-button" onClick={onSignupClick}>
          Get Started Today
        </button>
      </section>
    </main>
  );
}

export default Body_code