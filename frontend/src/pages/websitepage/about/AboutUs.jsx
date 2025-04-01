


import React from "react";
import "./AboutUs.css"; // Create AboutUs.css for styling

function AboutUs() {
  return (
    <section className="about-us-section">
      <h2>About Us</h2>
      <div className="about-us-content">
        <div className="about-us-text">
          <p>
            We are dedicated to revolutionizing financial management. Our
            mission is to empower individuals and businesses with accessible,
            efficient, and secure financial solutions. We leverage innovative
            technology to provide seamless mobile money transfers and automated
            savings tools, helping our clients achieve their financial goals.
          </p>
          <p>
            Our core values center around trust, transparency, and customer
            satisfaction. We strive to build long-lasting relationships by
            delivering exceptional service and continuously improving our
            platform.
          </p>
        </div>
        <div className="about-us-image">
     
          <img src="/assets/icon.jpg" alt="About Us" />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;