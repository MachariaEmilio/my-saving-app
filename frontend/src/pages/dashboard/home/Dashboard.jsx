import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";
import Transactionshistoy from "../../../components/history/transactionshistoy";
import SendMoney from "../../../components/send money/sendmoney";
import Modal from "@mui/material/Modal";import Saving from "../saving/Saving";
;

const Home = () => {
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  // Handle Modal open/close
  const handleModalStatus = () => {
    setOpen(!open);
  };
    const userDetailsString = localStorage.getItem("userdetails"); 
  const user = JSON.parse(userDetailsString); // Parse the string into an object
  const userId = user.id; // Extract the user ID
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsString = localStorage.getItem("userdetails"); // Get userDetails string from localStorage
      if (!userDetailsString) {
        navigate("/login"); // If no userDetails found, navigate to login
        return;
      }

      try {
        const user = JSON.parse(userDetailsString); // Parse the string into an object
        const userId = user.id; // Extract the user ID

        // Fetch user details
        const fetchedUserDetails = await fetch(
          `http://localhost:3000/users/${userId}`
        ).then((res) => res.json());

        setUserDetails(fetchedUserDetails);
        setBalance(fetchedUserDetails.balance); // Update balance with fetched data
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
    //remove the interval , since we dont want to refresh every minute.
  }, [navigate]);

  if (!userDetails) {
    return <p>Loading...</p>; // Show loading state while fetching user details
  }

  return (
    <div className="main">
      <header className="header">
        <img
          src="/assets/icon.jpg"
          onClick={() => {
            navigate("/home/settings");
          }}
          alt="company  Icon"
        />
        <p>
          Welcome {userDetails.Fname} {userDetails.Sname}
        </p>
      </header>
      <div className="balance container" id="balance">
        <p>Your available balance</p>
        <p>
          KSH <span className="color">{balance}</span>
        </p>
      </div>

      <button onClick={handleModalStatus}> send money </button>
      <button> save </button>
      <div>
        <Transactionshistoy />
      </div>

      <Modal
        onClose={handleModalStatus}
        open={open}
        style={{
          display: "block",
          position: "absolute",
          margin: "auto",
          marginTop: "120px",
          height: 300,
          width: 350,
        }}
      >
        <SendMoney setStatus={setOpen} />
      </Modal>
      <Saving userId={userId} />
    </div>
  );
};

export default Home;
