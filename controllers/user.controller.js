import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/sendMail.js";
import { generateRandomString } from "../utils/randomString.js";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: `User with ${existingUser.email} mail id already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      status: true,
      message: "User Registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Register failed Internal server error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res
      .status(200)
      .json({ status: true, message: "Login successfully", data: findUser });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const listAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, { _id: 0, password: 0 });

    res.status(200).json({
      message: "All Users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    //Check if user exists in DB
    let userExists = await User.findOne({ email: req.body.email });
    if (userExists && req.body.email !== "") {
      const tokenString = generateRandomString(20);
      const mailId = req.body.email;
      //Reset Link
      const resetLink = `${process.env.RESET_LINK}?token=${tokenString}&email=${mailId}`;

      const message = `<p>Hello ${userExists.username},</p>
          <p>
            You have requested to reset your password. Click the button below to
            reset it:
          </p>
          <a href="${resetLink}">
            <button style="padding: 10px; background-color: #000; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Reset Your Password
            </button>
          </a>`;
      await sendMail(req.body.email, message);

      //update the DB with Random string
      await User.updateOne(
        { email: req.body.email },
        { randomString: tokenString }
      );

      //Status send
      res.status(201).send({
        message: "Reset Link send to your email",
      });
    } else {
      res
        .status(400)
        .send({ message: `User ${req.body.email} does not exists` });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email });
    if (user) {
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      const equalPassword = password === confirmPassword;
      const hashedPassword = await bcrypt.hash(password, 10);
      if (equalPassword && password !== "" && confirmPassword !== "") {
        await User.updateOne(
          { email: req.body.email },
          { password: hashedPassword }
        );
        await User.updateOne(
          { email: req.body.email },
          { $unset: { randomString: 1 } }
        );
        res.status(200).json({ message: "Updated successfully" });
      } else {
        res
          .status(400)
          .json({ message: "Password and confirm password doesnt match" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
