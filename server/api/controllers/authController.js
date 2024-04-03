import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
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
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("signup successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
