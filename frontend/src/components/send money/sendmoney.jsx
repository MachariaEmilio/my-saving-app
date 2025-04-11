import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sendmoney.css";

const SendMoney = ({ setStatus }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const senderid = JSON.parse(localStorage.getItem("userdetails"));

  // State to hold input data
  const [inputData, setInputData] = useState({
    sender_id: senderid.id,
    receiver_id: "",
    amount: "",
    password: "",
  });

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (inputData.amount <= 0) {
      setMessage("The minimum amount for transaction is 1");
    } else if (inputData.sender_id === inputData.receiver_id) {
      setMessage("You can't create a transaction to your own account");
    } else {
      try {
        const createTransaction = await fetch(
          "http://localhost:3000/transactions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
          }
        );

        if (!createTransaction.ok) {
          alert(
            "Something happened. The transaction is not complete. Please check the message sent to you."
          );
          setStatus(false);
          return;
        }

        const data = await createTransaction.json();

        if (data.status !== 200) {
          alert(
            "Something happened. The transaction is not complete. Please check the message sent to you."
          );
        } else {
          alert("You have successfully sent. Wait for confirmation message.");

          // Clear input fields only on success
          setInputData({
            sender_id: senderid.id,
            receiver_id: "",
            amount: "",
            password: "",
          });

          setStatus(false);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Transaction error:", error);
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  }

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== "password") {
      setInputData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setInputData((prev) => ({ ...prev, [name]: value }));
    }
    setMessage("");
  };

  return (
    <div className="SendMoneyModal">
      <p className="descri" id="transcat">
        Send money
      </p>

      <form onSubmit={handleSubmit} className="transactionform">
        <label htmlFor="receiver_id">Enter the receiver ID</label>
        <input
          name="receiver_id"
          type="number"
          id="receiver_id"
          value={inputData.receiver_id || ""}
          onChange={handleChange}
        />

        <label htmlFor="amount">Enter the amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={inputData.amount || ""}
          onChange={handleChange}
        />

        {/* Show error message if any */}
        <label style={{ color: "red", fontSize: "17px" }}>{message}</label>

        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={inputData.password || ""}
          onChange={handleChange}
        />

        <button type="submit" name="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
