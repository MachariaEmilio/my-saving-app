import { validationResult } from "express-validator";
import { checkbalance, checkpassword, checksavings } from "../helperfunctions/transaction helper funtions/transaction.mjs";
export const verify_savings = async (req, res, next) => {
  try {
    const errorresults = validationResult(req);
    if (!errorresults.isEmpty()) {
      res.send(errorresults);
    } else {
      next();
    }
  } catch (error) {
    console.error("Error updating savings:", error);
  }
};

export const verify_withdraw_savings = async (req, res, next) => {
  try {
    const errorresults = validationResult(req);
    if (!errorresults.isEmpty()) {
      res.send(errorresults);
    } else {
       const { Userid,   savingAmount} = req.body;
     const savingbalance = await  checksavings(Userid)
     if(savingbalance<savingAmount){
     return res.status(400).json({ error: "Insufficient savings balance." });
     }
      next();
    }
  } catch (error) {
    console.error("Error updating savings:", error);
  }
};
export const verify_deposit_savings = async (req, res, next) => {
  try {
    const errorresults = validationResult(req);
    if (!errorresults.isEmpty()) {
      return res.status(400).json({ errors: errorresults.array() })
    }

    const { Userid, Amount } = req.body;
    const amountbalance = await checkbalance(Userid);

    if (amountbalance < Amount) {
      return res.status(400).json({ error: "Insufficient account balance." }); 
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying savings deposit:", error);
    return res.status(500).json({ error: "Internal server error." }); // Send error to the client
  }
};

export const verify_passwords = async (req, res, next) => {
  try {
    const errorresults = validationResult(req);
    if (!errorresults.isEmpty()) {
      return res.status(400).json({ errors: errorresults.array() });
    }

    const { currentPassword, Userid } = req.body;
    const pass = await checkpassword(Userid);

    if (pass !== currentPassword) {
      return res.status(400).json({ error: "password does not match" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying password:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

