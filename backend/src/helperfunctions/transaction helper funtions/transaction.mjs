import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// checks the balance
export const checkpassword = async (userid) => {
  const balance = await prisma.userDetails.findUnique({
    where: { id: userid },
    select: { password: true },
  });

  return balance.password;
};

export const checkbalance= async (userid) => {
  const balance = await prisma.userDetails.findUnique({
    where: { id: userid },
    select: { balance: true },
  });

  return balance.balance;
};
// console.log( await checkbalance(1))
export const checksavingercentage = async (userid) => {
  const Saving_balance = await prisma.savings.findUnique({
    where: { Userid: userid },
    select: { savingPercentage: true },
  });
if (Saving_balance){
  console.log(`  saving percentage = ${Saving_balance.savingPercentage}`);
  return Saving_balance.savingPercentage;
}else{
  return 0 ;
}

};

// console.log(await checksavingercentage(12));

export const calculateSavings = (percentage, amount) => {

  return (percentage / 100) * amount;
};
// console.log(await calculateSavings(0,100));

export const checksavings = async (userid) => {
  const Saving_balance = await prisma.userDetails.findUnique({
    where: { id: userid },
    select: { savingsBalance: true },
  });

  return Saving_balance.savingsBalance;
};
// console.log(await checksavings(1));
export const checknames = async (userid) => {
  const names = await prisma.userDetails.findUnique({
    where: { id: userid },
    select: {
      Fname: true,
      Sname: true,
    },
  });

  return names;
};

// check if amount is greater or equal to the amount being sent
export const balance = async (id, amount) => {
  const balances = await checkbalance(id);

  if (amount <= balances) {
    return 200;
  } else {
    return 404;
  }
};
// function for depositing money and widthrawing
export const deposit_amount = async (userid, newamount, savings) => {
  try {
    const balance = await checkbalance(userid);
    const savingsBalance = await checksavings(userid);
  
    await prisma.userDetails.update({
      where: {
        id: userid,
      },
      data: {
        balance: balance + newamount,
        savingsBalance: savingsBalance + savings,
      },
    });

    return 200;
  } catch (error) {
    console.log("error updating ", error);
  }
};

export const widthdraw_amount = async (userid, newamount) => {
  try {
    const balance = await checkbalance(userid);

    await prisma.userDetails.update({
      where: {
        id: userid,
      },
      data: {
        balance: balance - newamount,
      },
    });

    return 200;
  } catch (error) {
    console.log("error updating ", error);
  }
};
