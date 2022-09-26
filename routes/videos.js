import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  searchByTitle,
  searchByTags,
  subscribed,
  trending,
  updateVideo,
} from "../controllers/videos.js";
import { verifyToken } from '../utils/verifyToken.js';


const router = express.Router();

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.put("/view/:id", addView);
router.get("/subscribed", verifyToken, subscribed);
router.get("/random", random);
router.get("/trending", trending);
router.get("/tags", searchByTags);
router.get("/search", searchByTitle);
router.get("/:id", getVideo);

export default router;
