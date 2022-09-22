import express from "express";

import { signup } from "../controllers/auth.js";


const router = express.Router();

// Create a user
router.post("/signup", signup);

// TODO: Sign in
// router.post("/signin", ___);

// TODO: Authenticate with Google
// router.post("/google", ___);

export default router;
