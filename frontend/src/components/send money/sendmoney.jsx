import React from "react";
import "./sendmoney.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendMoney = ({ setStatus }) => {
  const [message, setmessage] = useState("");
const navigate = useNavigate()
  // const senderid = useSelector((data) => data.userdetails.userdetails.id);
  const senderid = JSON.parse(localStorage.getItem("userdetails"));

  const [inputData, SetInputData] = useState({ sender_id: senderid.id });
  // console.log(inputData);
  async function handleSubmit(e) {
    e.preventDefault();
    if (inputData.amount <= 0) {
      setmessage("The minimum amount for transaction 1");
    } else {
      if (inputData.sender_id === inputData.receiver_id) {
        setmessage("you can't create a transaction to your account ");
      } else {
        // console.log("object input data:", inputData);
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
            "Something happened.The transaction is not complete .Please check the message sent to you "
          );
          setStatus(false);
        } else {
          const data = await createTransaction.json();
          console.log(data);
          if (data.status !== 200) {
            alert(
              "Something happened.The transaction is not complete .Please check the message sent to you "
            );
          } else {
            alert("You have successfully sent .Wait for confirmation message ");
            navigate("/dashboard")
            setStatus(false);
          }
        }
      }
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== "password") {
      SetInputData((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      SetInputData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setmessage("");
  };

  return (
    <div className="SendMoneyModal">
      <p className="descri" id="transcat">
        Send money
      </p>

      <form
        action="receiver_id"
        onSubmit={handleSubmit}
        className="transactionform"
      >
        <label htmlFor="receiver_id">Enter the receiver id</label>
        <input
          name="receiver_id"
          type="number"
          id="receiver_id"
          onChange={handleChange}
        />

        <label htmlFor="amount">Enter the amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          onChange={handleChange}
        />

        <label style={{ color: "red", fontSize: "17px" }}>{message}</label>

        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          name="password"
          id="password"
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
