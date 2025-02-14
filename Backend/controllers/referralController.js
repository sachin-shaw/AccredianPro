import Referral from "../models/Referral.js";
import sendReferralEmail from "../utils/emailService.js";

export const ReferralController = async (req, res) => {
  try {
    const { name, email, referredBy } = req.body;

    // Validate input
    if (!name || !email || !referredBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to database
    const newReferral = new Referral({ name, email, referredBy });
    await newReferral.save();

    // Send Email Notification
    await sendReferralEmail(email, name, referredBy);

    res.status(201).json({ message: "Referral submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
