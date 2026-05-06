import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;

async function sendTestEmail() {
  console.log("Checking SMTP configuration...");
  console.log("Host:", SMTP_HOST);
  console.log("User:", SMTP_USER);
  console.log("To:", SMTP_TO || "cash.cube99@gmail.com");

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Error: SMTP configuration is missing in environment variables.");
    console.log("Please make sure you have set SMTP_HOST, SMTP_USER, and SMTP_PASS in the Secrets panel.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587"),
    secure: SMTP_PORT === "465",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"בדיקת כסף על הרצפה" <${SMTP_USER}>`,
    to: SMTP_TO || "cash.cube99@gmail.com",
    subject: "מייל בדיקה ממערכת כסף על הרצפה",
    text: "זהו מייל בדיקה שנשלח כדי לוודא שהגדרות ה-SMTP תקינות.",
    html: "<h1>בדיקת מערכת</h1><p>זהו מייל בדיקה שנשלח כדי לוודא שהגדרות ה-SMTP תקינות.</p>",
  };

  try {
    console.log("Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

sendTestEmail();
