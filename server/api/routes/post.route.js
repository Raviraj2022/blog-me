import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/createPost", verifyToken, createPost);
router.get("/getPost", getPost);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);
router.put("/updatePost/:postId/:userId", verifyToken, updatePost); //add middleware

export default router;
