export const verifySavings = {
  savingPercentage: {
    notEmpty: {
      errorMessage: "receiversid  should not be empty",
    },
  },
  Userid: {
    notEmpty: {
      errorMessage: "sender_id  should not be empty",
    },
  },
};
export const verify_withdraw_Savings = {
  savingAmount: {
    notEmpty: {
      errorMessage: "savings amount should not be empty",
    },
  },
  Userid: {
    notEmpty: {
      errorMessage: "clients   should not be empty",
    },
  },
};
export const verify_deposit_Savings = {
  Amount: {
    notEmpty: {
      errorMessage: "Amount to save should not be empty",
    },
  },
  Userid: {
    notEmpty: {
      errorMessage: "sender id should not be empty",
    },
  },
};
export const verify_Password = {
  currentPassword: {
    notEmpty: {
      errorMessage: "currentPassword should not be empty",
    },
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: " confirmPassword should not be empty",
    },
  },
  Userid: {
    notEmpty: {
      errorMessage: " confirmPassword should not be empty",
    },
  },
};
