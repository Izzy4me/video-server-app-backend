import express from "express";
import { verifyToken } from "../utils/verifyToken.js";

import { addComment, deleteComment, getComments } from "../controllers/comments.js"


const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", verifyToken, getComments);

export default router;
