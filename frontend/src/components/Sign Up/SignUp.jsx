import React, { useState } from "react";

const SignUp = ({
  inputdata,
  setinput_value,
  setCompletedsignup,
  setsentotp,
  onloginclick,
}) => {
  const [message, setmessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputdata.pass !== inputdata.password) {
      setmessage({ passworderror: "The password  do not match" });
    } else {
      // we need to check if the user and the phone number exists
      const detailsStatus = await fetch(
        `http://localhost:3000/checkdetails/${inputdata.id}/${inputdata.phone}`
      );
      const data = await detailsStatus.json();
      if (!detailsStatus.ok) {
        setmessage({ detailserror: data.error });
      } else {
        const code = await (
          await fetch(`http://localhost:3000/sendemails/${inputdata.email}`)
        ).json();

        if (code) {
          setsentotp(parseInt(code.Otp));
        }
        setCompletedsignup(true);
        setmessage({ success: "login succesful✅✅✅" });
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name !== "id") {
      setinput_value((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setinput_value((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    }
    setmessage("");
  };

  return (
    <>
      <div className="auth-container">
        <h2>Create a new account</h2>
        {message.success && (
          <p className="success-message">{message.success}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">UserId:</label>
            <input
              type="number"
              name="id"
              id="id"
          
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone number:</label>
            <input
              type="number"
              name="phone"
              id="phone"
           
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Fname">First name:</label>
            <input
              type="text"
              name="Fname"
              id="Fname"
            
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Sname">Second name:</label>
            <input
              type="text"
              name="Sname"
              id="Sname"
           
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
          
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="PNumber">Password:</label>
            <input
              type="password"
              name="pass"
              id="PNumber"
           
              minLength="6"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="CPNumber">Confirm Password:</label>
            <input
              type="password"
              name="password"
              id="CPNumber"
         
              minLength="6"
              onChange={handleChange}
              required
            />
          </div>

          {message.passworderror && (
            <p className="error-message">{message.passworderror}</p>
          )}
          {message.detailserror && (
            <p className="error-message">{message.detailserror}</p>
          )}

          <button type="submit">Submit</button>
        </form>

        <div className="login-link">
          <p>
            Already have an account?{" "}
            <a href="#" onClick={onloginclick}>
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
