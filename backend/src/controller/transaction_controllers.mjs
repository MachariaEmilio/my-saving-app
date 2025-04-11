import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
import {
  calculateSavings,
  checkbalance,
  checknames,
  checksavingercentage,
  checksavings,
  deposit_amount,
  widthdraw_amount,
} from "../helperfunctions/transaction helper funtions/transaction.mjs";

import {
  send_email,
  send_email_savings,
  send_email_to_sender,
} from "../middlewares/emailsender.mjs";
import { get_email } from "../helperfunctions/checkuser.mjs";

// gets all taransactions for everyone
export const getalltransactions = async (req, res) => {
  try {
    const transactions = await prisma.transactionrecord.findMany();
    res.send({ data: { transactions } });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
// intiates a new trasaction

export const createatransaction = async (req, res) => {
  try {
    const { body } = req;

    const saving_to_add = calculateSavings(
      await checksavingercentage(body.receiver_id),
      body.amount
    );
    const amount = body.amount - saving_to_add;

    await widthdraw_amount(body.sender_id, body.amount);
    await deposit_amount(body.receiver_id, amount, saving_to_add);

    body.timestamp = new Date().toISOString();

    const randomId = uuidv4();

    body.transaction_id = randomId;
    const receiveremail = await get_email(body.receiver_id);

    const senderemail = await get_email(body.sender_id);
    const { password, ...transactionhistorydata } = body;
    // send to sender

    await send_email_to_sender(senderemail, body);
    // sends to receiver
    if (saving_to_add <= 0) {
      await send_email(receiveremail, body);
    } else {
      body.savingamount = saving_to_add;
      send_email_savings(receiveremail, body);
    }

    const newtransaction = await prisma.transactionrecord.create({
      data: transactionhistorydata,
    });
    res.status(200).json({ status: 200, data: newtransaction });
  } catch (error) {
    res.status(500).send({ error: error });
    console.log(error);
  }
};export const getTransactionRecord = async (req, res) => {
  const {
    params: { id },
  } = req;

  const userId = parseInt(id);

  // Get transactions sent by the user
  const usersent = await prisma.transactionrecord.findMany({
    where: { sender_id: userId },
  });

  const sent_transactions = usersent.map((item) => ({
    ...item,
    amount: `-${item.amount}`,
    id: item.receiver_id,
  }));

  // Get transactions received by the user
  const userReceived = await prisma.transactionrecord.findMany({
    where: { receiver_id: userId },
  });

  const received_transactions = userReceived.map((item) => ({
    ...item,
    amount: `+${item.amount}`,
    id: item.sender_id,
  }));

  // If no transactions at all
  if (sent_transactions.length === 0 && received_transactions.length === 0) {
    return res.json({ data: "none" });
  }

  // Add fullnames to sent transactions
  const sentNames = await Promise.all(
    sent_transactions.map((tx) => checknames(tx.receiver_id))
  );
  sent_transactions.forEach((tx, i) => {
    const name = sentNames[i];
    tx.fullname = name ? `${name.Fname} ${name.Sname}` : "Unknown User";
  });

  // Add fullnames to received transactions
  const receivedNames = await Promise.all(
    received_transactions.map((tx) => checknames(tx.sender_id))
  );
  received_transactions.forEach((tx, i) => {
    const name = receivedNames[i];
    tx.fullname = name ? `${name.Fname} ${name.Sname}` : "Unknown User";
  });

  // Combine and sort all transactions
  const Alltransactions = [...sent_transactions, ...received_transactions];
  Alltransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Format timestamps
  function formatDateTime(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const datePart = date.toLocaleDateString("en-US", options);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${datePart}, ${hours}:${minutesStr} ${ampm}`;
  }

  Alltransactions.forEach((tx) => {
    tx.timestamp = formatDateTime(tx.timestamp);
  });

  res.json({ data: Alltransactions });
};


export const updatesavings = async (req, res) => {
  try {
    const { Userid, savingPercentage } = req.body;

    // Validate input (optional but recommended)
    if (!Userid || savingPercentage === undefined) {
      return res
        .status(400)
        .json({ error: "Userid and savingPercentage are required." });
    }

    // Use Prisma to update the savings table
    const updatedSavings = await prisma.savings.update({
      where: {
        Userid: parseInt(Userid), // Ensure Userid is an integer
      },
      data: {
        savingPercentage: parseInt(savingPercentage), // Ensure savingPercentage is an integer
      },
    });

    res.status(200).json(updatedSavings);
  } catch (error) {
    console.error("Error updating savings:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found." }); //prisma error for record not found.
    }

    res.status(500).json({ error: "Failed to update savings." });
  }
};

export const withdrawSavings = async (req, res) => {
  try {
    const { Userid, savingAmount } = req.body;

    // Validate input (optional but recommended)
    if (!Userid || savingAmount === undefined || savingAmount < 0) {
      return res
        .status(400)
        .json({ error: "Userid and a valid savingAmount are required." });
    }

    // Fetch the user's current balances
    const user = await prisma.userDetails.findUnique({
      where: {
        id: parseInt(Userid),
      },
      select: {
        savingsBalance: true,
        balance: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Perform the withdrawal and balance update
    const newSavingsBalance = user.savingsBalance - parseInt(savingAmount);
    const newBalance = user.balance + parseInt(savingAmount);

    // Ensure savings balance doesn't go negative
    if (newSavingsBalance < 0) {
      return res.status(400).json({ error: "Insufficient savings balance." });
    }

    // Update the user details
    const updatedUser = await prisma.userDetails.update({
      where: {
        id: parseInt(Userid),
      },
      data: {
        savingsBalance: newSavingsBalance,
        balance: newBalance,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error withdrawing savings:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found." }); // Prisma error for record not found.
    }

    res.status(500).json({ error: "Failed to withdraw savings." });
  }
};

export const DepositSavings = async (req, res) => {
  try {
    const { Userid, Amount } = req.body;

    // Validate input (optional but recommended)
    if (!Userid || Amount === undefined || Amount < 0) {
      return res
        .status(400)
        .json({ error: "Userid and a valid Amount are required." });
    }

    // Fetch the user's current balances
    const user = await prisma.userDetails.findUnique({
      where: {
        id: parseInt(Userid),
      },
      select: {
        savingsBalance: true,
        balance: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Perform the deposit and balance update
    const newSavingsBalance = user.savingsBalance + parseInt(Amount);
    const newBalance = user.balance - parseInt(Amount);

    // Ensure main balance doesn't go negative
    if (newBalance < 0) {
      return res.status(400).json({ error: "Insufficient account balance." });
    }

    // Update the user details
    const updatedUser = await prisma.userDetails.update({
      where: {
        id: parseInt(Userid),
      },
      data: {
        savingsBalance: newSavingsBalance,
        balance: newBalance,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error depositing savings:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found." }); // Prisma error for record not found.
    }

    res.status(500).json({ error: "Failed to deposit savings." });
  }
};
export const changepassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, Userid } = req.body;

    // Validate input (very important)
    if (!Userid || !currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Userid, currentPassword, and newPassword are required.",
      });
    }

    // Fetch the user's stored password (plain text - UNSAFE)
    const user = await prisma.userDetails.findUnique({
      where: { id: parseInt(Userid) },
      select: { password: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Verify the current password (plain text - UNSAFE)
    if (currentPassword !== user.password) {
      return res.status(401).json({ error: "Incorrect current password." });
    }

    // Update the password in the database (plain text - UNSAFE)
    const updatedUser = await prisma.userDetails.update({
      where: { id: parseInt(Userid) },
      data: { password: newPassword },
    });

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(500).json({ error: "Failed to change password." });
  }
};
