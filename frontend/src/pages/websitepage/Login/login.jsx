import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import LoginSuccess from "../../../components/loginsuccess/loginsuccess";

function Login({ onLogin, onSignup }) {
  const [id, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/login/${id}/${password}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      } else {
        const data = await response.json();

        if (data.status === 200) {
          setError("login successful ✅✅");
           const userdetails = await fetch(
             `http://localhost:3000/users/${id}`
           ).then((data) => data.json());

           localStorage.setItem("userdetails", JSON.stringify(userdetails));
          setLoginSuccessful(true);
          console.log("User ID:", id);

          try {
            const userdetailsResponse = await fetch(
              `http://localhost:3000/users/${parseInt(id)}`
            );

            const userdetails = await userdetailsResponse.json();
            console.log(userdetails);

            if (!userdetailsResponse.ok) {
              throw new Error(
                `Error fetching user details: ${userdetailsResponse.status}`
              );
            }

            if (userdetails && userdetails.fname && userdetails.sname) {
              setUserName(`${userdetails.fname} ${userdetails.sname}`);
            } else {
              throw new Error("User details not found or invalid format");
            }
          } catch (userDetailsError) {
            console.error("Error fetching user details:", userDetailsError);
   
          }
        } else {
          setError("Invalid Credentials❌❌");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed due to network error");
    }
  };

  const handleSignupClick = () => {
    if (onSignup) {
      onSignup();
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      {loginSuccessful && <LoginSuccess message={`${userName} you successfully logged in.`} />}{" "}
      {/* Removed onClose prop */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">UserId:</label>
          <input
            type="number"
            id="username"
            value={id}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autocomplete="new-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account?{" "}
        <a href="#" onClick={onSignup}>
          Sign Up
        </a>
      </p>
    </div>
  );
}

export default Login;
