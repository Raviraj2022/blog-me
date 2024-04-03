import express from "express";
import { test } from "../controllers/userController.js";
// console.log("Route");
const router = express.Router();
router.get("/test", test);
export default router;
