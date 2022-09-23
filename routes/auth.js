import express from "express";

import { signin, signup } from "../controllers/auth.js";


const router = express.Router();

// Create a user
router.post("/signup", signup);

// Sign in
router.post("/signin", signin);

// TODO: Authenticate with Google
// router.post("/google", ___);

export default router;
