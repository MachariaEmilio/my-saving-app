import React, { useState, useEffect } from "react";
import "./Loginsuccess.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoginSuccess({ message }) {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30);

    const timeout = setTimeout(() => {
      navigate("/DashBoard");
    }, 3000); // Navigate after 3 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout); // Clear timeout on unmount
    };
  }, [navigate]); // Add navigate to dependency array

  const handleClose = () => {
    navigate("/DashBoard"); // Navigate immediately
  };

  return (
    <div className="login-success-overlay">
      <div className="login-success-modal">
        <h2>Login Successful!</h2>
        <p>
          {`${message}` ||
            "You have successfully signed "}
        </p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default LoginSuccess;
