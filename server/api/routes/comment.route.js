import express from "express";
import { createComment } from "../controllers/commentController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
router.post("/createComment", verifyToken, createComment);
export default router;
