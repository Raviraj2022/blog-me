import express from "express";
import { signup } from "../controllers/authController.js";
// import { test } from "../controllers/userController.js";
const router = express.Router();
router.post("/signup", signup);
// const router = express.Router();
// router.get("/test", test);

export default router;
