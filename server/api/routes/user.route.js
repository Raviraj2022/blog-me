import express from "express";
import {
  deleteUser,
  getUsers,
  logoutUser,
  test,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";
// console.log("Route");
const router = express.Router();
router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/logout", logoutUser);
router.get("/getUsers", verifyToken, getUsers);
export default router;
