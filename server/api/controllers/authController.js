import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
 const JWT_SECRET = "asdfghjkwertyuzxcvbnm";
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password == "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    console.log(`Error in SignIn ${error}`);
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 8);
      const newUser = new User({
        username:
          name.toLowerCase().split("").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
