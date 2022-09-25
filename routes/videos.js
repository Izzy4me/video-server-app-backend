import express from "express";
import { addVideo, deleteVideo, getVideo, random, trending, updateVideo, addView, subscribed } from "../controllers/videos.js";
import { verifyToken } from '../utils/verifyToken.js';


const router = express.Router();

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.put("/view/:id", addView);
router.get("/subscribed", verifyToken, subscribed);
router.get("/random", random);
router.get("/trending", trending);
router.get("/:id", getVideo);

export default router;
