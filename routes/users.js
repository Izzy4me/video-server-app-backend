import express from "express";
import { getUser, updateUser, removeUser, subscribe, unsubscribe, like, dislike } from "../controllers/users.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// We are using verifyToken as a middlewere for almost every endpoint,
// because not authenticated user should not do anything

router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, removeUser);
router.put("/subscribe/:id", verifyToken, subscribe);
router.put("/unsubscribe/:id", verifyToken, unsubscribe);
router.put("/like/:videoId", verifyToken, like);
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
