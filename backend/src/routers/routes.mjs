import express from "express";

import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  checkdetails,
  getalluser,
  getauser,
  GetAUserSavings,
  log_in_user,
  post_user,
} from "../controller/usercontroller.mjs";
import {
  getalltransactions,
  createatransaction,
  getTransactionRecord,
  updatesavings,
  withdrawSavings,
  DepositSavings,
  changepassword,
} from "../controller/transaction_controllers.mjs";
import { verify_regusers } from "../schema/userschema.mjs";
import { registeruser } from "../middlewares/userroutes.mjs";
import { verify_transactions } from "../schema/transactionschema.mjs";
import { verify_registration_data } from "../middlewares/createtransaction.mjs";
import { send_email_otp } from "../controller/emailcontroller.mjs";
import {
  verify_deposit_Savings,
  verify_Password,
  verify_withdraw_Savings,
  verifySavings,
} from "../schema/savingschema.mjs";
import {
  verify_deposit_savings,
  verify_passwords,
  verify_savings,
  verify_withdraw_savings,
} from "../middlewares/verifysavinginfo.mjs";

const router = Router();
router.use(express.json());
// routes to the users
router.route("/users/:id").get(getauser);
router.route("/users").get(getalluser).post(post_user);
router
  .route("/registeruser")
  .post(checkSchema(verify_regusers), registeruser, post_user);
//routes for transaction
router.route("/login/:id/:password").get(log_in_user);
router.route("/transactionbyid/:id").get(getTransactionRecord);
//route for creating savings
router.route("/savings/:id").get(GetAUserSavings);
router
  .route("/savings")
  .post(checkSchema(verifySavings), verify_savings, updatesavings);
router
  .route("/Withdrawsavings")
  .post(
    checkSchema(verify_withdraw_Savings),
    verify_withdraw_savings,
    withdrawSavings
  );
router
  .route("/changepassword")
  .post(
    checkSchema(verify_Password),
    verify_passwords,
    changepassword
  );
router
  .route("/DepositSavings")
  .post(
    checkSchema(verify_deposit_Savings),
    verify_deposit_savings,
   DepositSavings
  );

router
  .route("/transactions")
  .get(getalltransactions)
  .post(
    checkSchema(verify_transactions),
    verify_registration_data,
    createatransaction
  );
router.route("/checkdetails/:id/:phonenumber").get(checkdetails);

router.route("/sendemails/:receiveremail").get(send_email_otp);
export default router;
