import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getPost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/createPost", verifyToken, createPost);
router.get("/getPost", getPost);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);

export default router;
