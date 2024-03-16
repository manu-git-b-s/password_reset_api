import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const sendMail = async (mailReceiver, message) => {
  try {
    // Create Transporter with email configuration
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email Content
    const mailDetails = {
      from: process.env.EMAIL_ID,
      to: mailReceiver,
      subject: "Password Reset",
      html: message,
    };

    // Send mail
    const info = await transporter.sendMail(mailDetails);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
