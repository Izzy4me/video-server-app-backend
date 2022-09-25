import express from "express";
import { addVideo, updateVideo } from "../controllers/videos.js";
import { verifyToken } from '../utils/verifyToken.js';


const router = express.Router();

// Create new video
router.post("/", verifyToken, addVideo)

// Update video details
router.put("/:id", verifyToken, updateVideo);

// Delete video
router.delete("/:id", verifyToken, updateVideo);

// Get video
router.get("/:id", updateVideo);


// Additional methods
// TODO: addView
// TODO: subscribed videos
// TODO: random
// TODO: trending

export default router;
