import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost, getPost } from "../controllers/postController.js";

const router = express.Router();

router.post("/createPost", verifyToken, createPost);
router.get("/getPost", getPost);

export default router;
