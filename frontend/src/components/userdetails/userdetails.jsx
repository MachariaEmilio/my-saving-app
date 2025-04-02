// UserDetails.jsx
import React from "react";
import "./Userdetails.css";

const UserDetails = ({ user }) => {
  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <div className="user-details-item">
        <strong>First Name:</strong> {user.Fname}
      </div>
      <div className="user-details-item">
        <strong>Last Name:</strong> {user.Sname}
      </div>
      <div className="user-details-item">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="user-details-item">
        <strong>Phone:</strong> {user.phone}
      </div>
      <div className="user-details-item">
        <strong>User Id:</strong> {user.id}
      </div>
    </div>
  );
};

export default UserDetails;
