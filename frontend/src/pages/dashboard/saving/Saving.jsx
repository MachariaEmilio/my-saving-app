import React, { useState, useEffect } from "react";
import "./Saving.css"; // Create a Saving.css file for styling

const Saving = ({ userId }) => {
  const [savingPercentage, setSavingPercentage] = useState(0);
  const [newPercentage, setNewPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSavingPercentage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/savings/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch saving percentage");
        }
        const data = await response.json();
        setSavingPercentage(data.savingPercentage || 0);
        setNewPercentage(data.savingPercentage || 0);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSavingPercentage();
  }, [userId]);

  const handlePercentageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 100) {
      setNewPercentage(value);
    } else if (value < 0) {
      setNewPercentage(0); // Allow zero, but clamp below to 0
    } else if (value > 100) {
      setNewPercentage(100);
    }
  };

  const handleSavePercentage = async () => {
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
      setShowForm(false);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="saving-component">
      <h2>Your Saving Percentage</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <p>Your current saving percentage is: {savingPercentage}%</p>
      <button onClick={() => setShowForm(true)}>Change Percentage</button>

      {showForm && (
        <>
          <label htmlFor="percentage">New Saving Percentage (0-100):</label>
          <input
            type="number"
            id="percentage"
            value={newPercentage}
            onChange={handlePercentageChange}
          />
          <button onClick={handleSavePercentage}>Update Percentage</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Saving;
