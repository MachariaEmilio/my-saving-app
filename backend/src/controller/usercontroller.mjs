import { PrismaClient } from "@prisma/client";
import {
  CheckUserById,
  CheckUserByPhone,
} from "../helperfunctions/checkuser.mjs";
import { send_notification } from "../middlewares/emailsender.mjs";

const prisma = new PrismaClient();
// gets one user
export const getauser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const userbyid = await prisma.userDetails.findUnique({
      where: { id: parseInt(id) },
    });
    if (userbyid) {
      const { password, ...userdetails } = userbyid;
      res.status(200).send(userdetails);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
// gets all users in the database
export const getalluser = async (req, res) => {
  try {
    const all_user = await prisma.userDetails.findMany();
    res.send(all_user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
export const GetAUserSavings = async (req, res) => {
 try {
   const {
     params: { id },
   } = req;
   const userbyid = await prisma.savings.findUnique({
     where: { Userid: parseInt(id) },
   });
   
   if (userbyid) {
    
     res.status(200).send(userbyid);
   } else {
     res.status(404).send({ error: "User not found" });
   }
 } catch (error) {
   res.status(500).send({ error: "Internal Server Error" });
 }
};

//inserts user to the database after error handling and
//  verification of certain factors ie unique and the expected datatypes are complete
export const post_user = async (req, res) => {
  const { body } = req;
  body.balance = 0;
  body.savingsBalance = 0;
  console.log(body);
  const checkuser=CheckUserById(body.id);
  if (checkuser === 404){
await prisma.savings.create({
  data: {
    Userid: body.id,
    savingPercentage:0,
  },
});}else{
  await prisma.savings.update({
    data: {
      Userid: body.id,
      savingPercentage: 0,
      
    },
    where:{
      Userid: body.id
    }
  });
}
  const newUser = await prisma.userDetails.create({
    data: body,
  });
  send_notification(
    newUser.email,
    `you have successfully been registered to finpay mobile services your user id is ${newUser.id}`
  );

  res.status(200).send({
    message: "user succesfully signed and notification message sent ",
  });
};
export const log_in_user = async (req, res) => {
  const {
    params: { id, password },
  } = req;

  const userbyid = await prisma.UserDetails.findUnique({
    where: { id: parseInt(id) },
  });
  if (!userbyid) {
    res.status(200).send({
      status: 401,
      statusmessage: "failed",
      Message: "invalid credentials",
    });
  } else {
    if (parseInt(id) === userbyid.id && password === userbyid.password) {
      res.status(200).send({
        status: 200,
        statusmessage: "ok",
        Message: "login successful",
      });
    } else {
      res.status(200).send({
        status: 401,
        statusmessage: "failed",
        Message: "invalid credentials",
      });
    }
  }
};
export const checkdetails = async (req, res) => {
  const {
    params: { id, phonenumber },
  } = req;
  const idexist = await CheckUserById(id);
  const phoneExist = await CheckUserByPhone(phonenumber);

  if (idexist === 200 && phoneExist === 200) {
    res.status(404).send({
      status: 404,
      error: "id & phone already exists",
    });
  } else if (idexist === 200) {
    res.status(404).send({ status: 404, error: "id already exists" });
  } else if (phoneExist === 200) {
    res.status(404).send({ status: 404, error: "phone already exists" });
  } else {
    res.status(200).send({
      status: 200,
      Message: "details are succesful",
    });
  }
};
