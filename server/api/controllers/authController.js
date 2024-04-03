import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  //   console.log("Hii");
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    console.log("Hello");
    await newUser.save();
    res.json("signup successful");
  } catch (error) {
    next(error);
  }
};
