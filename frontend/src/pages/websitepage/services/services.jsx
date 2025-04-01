import React from "react";
import "./Services.css";

function Services() {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="services-grid">
        <div className="service-item">
          <h2>Send Money</h2>
          <p>
            Instantly send money to anyone, anywhere, with low fees and secure
            transactions. Transfer funds to bank accounts, mobile wallets, or
            pick-up locations. We support multiple currencies and offer
            real-time transaction tracking.
          </p>
          <ul>
            <li>Low transaction fees</li>
            <li>Multi-currency support</li>
            <li>Real-time tracking</li>
            <li>Secure and reliable</li>
          </ul>
          <img
            src="/assets/sendmoney.png"
            alt="Send Money"
            className="service-image"
          />
        
        </div>
        <div className="service-item">
          <h2>Automated Savings</h2>
          <p>
            Effortlessly grow your savings with our automated plans. Set your
            goals, customize your savings frequency, and watch your money grow.
            Enjoy competitive interest rates and flexible withdrawal options.
          </p>
          <ul>
            <li>Customizable savings plans</li>
            <li>Competitive interest rates</li>
            <li>Flexible withdrawals</li>
            <li>Goal-based savings</li>
          </ul>
          <img
            src="/assets/Automated Savings.jpg"
            alt="Automated Savings"
            className="service-image"
          />
    
        </div>
        <div className="service-item">
          <h2>Transaction History</h2>
          <p>
            Access a detailed history of all your transactions, including
            deposits, withdrawals, and transfers. Filter your transactions by
            date, type, or amount. Export your history for easy record-keeping.
          </p>
          <ul>
            <li>Detailed transaction overview</li>
            <li>Filter and search options</li>
            <li>Exportable history</li>
            <li>Secure data storage</li>
          </ul>
          <img
            src="/assets/history.jpg"
            alt="Transaction History"
            className="service-image"
          />
      
        </div>
      </div>
    </div>
  );
}

export default Services;
