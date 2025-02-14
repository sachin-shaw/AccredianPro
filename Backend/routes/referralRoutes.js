import express from "express";
const router = express.Router();
import { ReferralController } from "../controllers/referralController.js";
// Create a referral
router.post("/create", ReferralController);

export default router;
