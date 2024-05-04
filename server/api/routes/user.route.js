import express from "express";
import {
  deleteUser,
  getUser,
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
// router.get("/getCommntes", verifyToken, getComments);
// router.delete("/deleteUser", verifyToken, deleteUser)
router.get("/:userId", getUser);
export default router;
