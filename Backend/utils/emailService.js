import nodemailer from "nodemailer";

const sendReferralEmail = async (email, name, referredBy) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.MAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Referral Received",
      text: `Hello ${name},\n\nYou have been referred by ${referredBy}.\n\nBest Regards,\nTeam`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Referral email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email service failed");
  }
};

export default sendReferralEmail;
