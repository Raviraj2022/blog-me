import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

const JWT_SECRET = "asdfghjkwertyuzxcvbnm";
export const verifyToken = (req, res, next) => {
  //   console.log(req.cookies.access_token);
  const token = req.cookies.access_token;
  // console.log("to", token);
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // console.log(err);
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};
