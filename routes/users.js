import express from "express";
import { getUser, updateUser, removeUser, subscribe, unsubscribe, like, dislike } from "../controllers/users.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// We are using verifyToken as a middlewere for almost every endpoint,
// because not authenticated user should not do anything

router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, removeUser);
router.get("/subscribe:userId", verifyToken, subscribe);
router.get("/unsubscribe:userId", verifyToken, unsubscribe);
router.get("/like:videoId", verifyToken, like);
router.get("/dislike:videoId", verifyToken, dislike);

export default router;
