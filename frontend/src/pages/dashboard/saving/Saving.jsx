import React, { useState, useEffect } from "react";
import "./Saving.css";

const Saving = ({ userId, savingbalance }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [savingPercentage, setSavingPercentage] = useState(0);
  const [newPercentage, setNewPercentage] = useState(0);
  const [showPercentageForm, setShowPercentageForm] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchSavingPercentage = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`http://localhost:3000/savings/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch saving percentage");
        }
        const data = await response.json();
        setSavingPercentage(data.savingPercentage || 0);
        setNewPercentage(data.savingPercentage || 0);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchSavingPercentage();
  }, [userId]);

  const handlePercentageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 100) {
      setNewPercentage(value);
    } else if (value < 0) {
      setNewPercentage(0);
    } else if (value > 100) {
      setNewPercentage(100);
    }
  };

  const handleSavePercentage = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/savings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Userid: userId,
          savingPercentage: newPercentage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save saving percentage");
      }

      setSavingPercentage(newPercentage);
      setSuccessMessage("Saving percentage updated successfully!");
      setError(null);
      setShowPercentageForm(false);
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleDeposit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/DepositSavings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Userid: userId,
          Amount: parseInt(depositAmount, 10),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to deposit savings.");
      }

      setSuccessMessage("Savings deposited successfully!");
      setError(null);
      setShowDepositForm(false);
      setDepositAmount("");
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/Withdrawsavings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Userid: userId,
          savingAmount: parseInt(withdrawAmount, 10),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to withdraw savings.");
      }

      setSuccessMessage("Savings withdrawn successfully!");
      setError(null);
      setShowWithdrawForm(false);
      setWithdrawAmount("");
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const toggleDepositForm = () => {
    setShowDepositForm(!showDepositForm);
  };

  const toggleWithdrawForm = () => {
    setShowWithdrawForm(!showWithdrawForm);
  };

  return (
    <div className="saving-component">
      <p className="balance">
        Your current saving balance is:Ksh {savingbalance}
      </p>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {loading && <p className="loading">Loading...</p>}

      <button onClick={toggleDepositForm}>
        {showDepositForm ? "Hide Deposit" : "Deposit Savings"}
      </button>
      {showDepositForm && (
        <>
          <label htmlFor="depositAmount">Deposit Amount:</label>
          <input
            type="number"
            id="depositAmount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <button
            onClick={handleDeposit}
            disabled={parseInt(depositAmount, 10) === 0 || loading}
          >
            Deposit
          </button>
          <button onClick={() => setShowDepositForm(false)}>Cancel</button>
        </>
      )}

      <button onClick={toggleWithdrawForm}>
        {showWithdrawForm ? "Hide Withdraw" : "Withdraw Savings"}
      </button>
      {showWithdrawForm && (
        <>
          <label htmlFor="withdrawAmount">Withdraw Amount:</label>
          <input
            type="number"
            id="withdrawAmount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <button
            onClick={handleWithdraw}
            disabled={parseInt(withdrawAmount, 10) === 0 || loading}
          >
            Withdraw
          </button>
          <button onClick={() => setShowWithdrawForm(false)}>Cancel</button>
        </>
      )}

      <h2>Your Saving Percentage</h2>
      <p>Your current saving percentage is: {savingPercentage}%</p>
      <button onClick={() => setShowPercentageForm(true)}>
        Change Percentage
      </button>

      {showPercentageForm && (
        <>
          <label htmlFor="percentage">New Saving Percentage (0-100):</label>
          <input
            type="number"
            id="percentage"
            value={newPercentage}
            onChange={handlePercentageChange}
          />
          <button onClick={handleSavePercentage} disabled={loading}>
            Update Percentage
          </button>
          <button onClick={() => setShowPercentageForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Saving;
