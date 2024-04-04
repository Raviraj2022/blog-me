import express from "express";
import { google, signin, signup } from "../controllers/authController.js";
// import { test } from "../controllers/userController.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
// const router = express.Router();
// router.get("/test", test);

export default router;
