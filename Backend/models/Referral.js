import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  referredBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Referral", ReferralSchema);
