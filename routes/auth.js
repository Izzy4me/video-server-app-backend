import express from "express";

import { } from "../controllers/auth.js";


const router = express.Router();

// Create a user
router.post("/signup", signup);

// // Sign in
// router.post("/signin", ___);

// // Authenticate with Google
// router.post("/google", ___);

export default router;
