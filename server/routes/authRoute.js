import express from "express";

import { google, signin, signup, logout } from "../controllers/authController.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/logout", logout);

export default router;
