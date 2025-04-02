import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Transactionshistoy from "../../../components/history/transactionshistoy";
import SendMoney from "../../../components/send money/sendmoney";
import Saving from "../saving/Saving";
import UserDetails from "../../../components/userdetails/userdetails";
import ChangePassword from "../../../components/changepassword/changepassword";
import { FaBars } from "react-icons/fa"; // Import menu icon

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("sendMoney");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile nav

  const userDetailsString = localStorage.getItem("userdetails");
  const user = JSON.parse(userDetailsString);
  const userId = user.id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsString = localStorage.getItem("userdetails");
      if (!userDetailsString) {
        navigate("/home");
        return;
      }

      try {
        const user = JSON.parse(userDetailsString);
        const fetchedUserDetails = await fetch(
          `http://localhost:3000/users/${userId}`
        ).then((res) => res.json());

        setUserDetails(fetchedUserDetails);
        setBalance(fetchedUserDetails.balance);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [navigate, userId]);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="dashboard-container">
      <nav className={`dashboard-nav ${isNavOpen ? "open" : ""}`}>
        <button className="nav-toggle" onClick={toggleNav}>
          <FaBars />
        </button>
        <button
          onClick={() => {
            setActiveNav("dashboard");
            setIsNavOpen(false);
          }}
          className={activeNav === "dashboard" ? "active" : ""}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            setActiveNav("userDetails");
            setIsNavOpen(false);
          }}
          className={activeNav === "userDetails" ? "active" : ""}
        >
          User Details
        </button>
        <button
          onClick={() => {
            setActiveNav("changePassword");
            setIsNavOpen(false);
          }}
          className={activeNav === "changePassword" ? "active" : ""}
        >
          Change Password
        </button>
        <button
          onClick={() => {
            handleLogout();
            setIsNavOpen(false);
          }}
        >
          Logout
        </button>
      </nav>
      <div className="dashboard-content">
        {activeNav === "dashboard" && (
          <>
            <header className="dashboard-header">
              <img
                src="/assets/icon.jpg"
             
                alt="company Icon"
              />
              <p>
                Welcome {userDetails.Fname} {userDetails.Sname}
              </p>
            </header>

            <div className="dashboard-balance">
              <p>Your available balance</p>
              <p>
                KSH <span className="balance-amount">{balance}</span>
              </p>
            </div>

            <div className="dashboard-actions">
              <div className="action-buttons">
                <button
                  onClick={() => setActiveComponent("sendMoney")}
                  className={activeComponent === "sendMoney" ? "active" : ""}
                >
                  Send Money
                </button>
                <button
                  onClick={() => setActiveComponent("savings")}
                  className={activeComponent === "savings" ? "active" : ""}
                >
                  Savings
                </button>
              </div>
              <div className="active-component">
                {activeComponent === "sendMoney" && <SendMoney />}
                {activeComponent === "savings" && (
                  <Saving
                    userId={userId}
                    savingbalance={userDetails.savingsBalance}
                  />
                )}
              </div>
            </div>

            <div className="dashboard-history">
              <Transactionshistoy />
            </div>
          </>
        )}
        {activeNav === "userDetails" && <UserDetails user={userDetails} />}
        {activeNav === "changePassword" && <ChangePassword userId={userId} />}
      </div>
    </div>
  );
};

export default Dashboard;
