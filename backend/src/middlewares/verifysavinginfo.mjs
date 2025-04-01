import { validationResult } from "express-validator";
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
