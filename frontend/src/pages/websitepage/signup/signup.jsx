import React, { useState } from "react";
import "./signup.css";
import SignUp from "../../../components/Sign Up/SignUp";
import { Confirmdetails } from "../../../components/Sign Up/confirmemaildetails";
import LoginSuccess from "../../../components/loginsuccess/loginsuccess";


function Register({ onLoginClick }) {
   const [completedSignup, setCompletedsignup] = useState(false);
     const [completeregister ,setCompletedregister] =useState(false)
   const [inputdata, setinput_value] = useState({ balance: 90500 });
   const [sentotp, setsentotp] = useState(null);

   return (
     <>
       {completedSignup ? (
         completeregister ? (
           <LoginSuccess message={`you successfully signed in`} />
         ) : (
           <Confirmdetails inputdata={inputdata} sentotp={sentotp}  setcomplete={setCompletedregister}/>
         )
       ) : (
         <SignUp
           inputdata={inputdata}
           setinput_value={setinput_value}
           setCompletedsignup={setCompletedsignup}
           setsentotp={setsentotp}
           onloginclick={onLoginClick}
         />
       )}
     </>
   );
}

export default Register;
