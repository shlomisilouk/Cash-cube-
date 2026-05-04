import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email Transporter Setup
const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("SMTP configuration missing. Emails will not be sent. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in environment variables.");
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587"),
    secure: SMTP_PORT === "465",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Lead Form Submission
  app.post("/api/leads", async (req, res) => {
    const { name, phone, email, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;
    
    // In a real app, you'd save this to a database (e.g., Firestore)
    console.log("New Lead Received:", { 
      name, 
      phone, 
      email, 
      marketing: { utm_source, utm_medium, utm_campaign, utm_term, utm_content },
      timestamp: new Date() 
    });

    // Send Email Notification
    const transporter = createTransporter();
    if (transporter) {
      const mailOptions = {
        from: `"CASH$CUBE Leads" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO || "cash.cube99@gmail.com",
        subject: `ליד חדש מ-CASH$CUBE: ${name}`,
        html: `
          <div dir="rtl" style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #D4AF37;">ליד חדש התקבל!</h2>
            <p><strong>שם:</strong> ${name}</p>
            <p><strong>טלפון:</strong> ${phone}</p>
            <p><strong>אימייל:</strong> ${email}</p>
            <hr />
            <h3>פרטים שיווקיים:</h3>
            <ul>
              <li><strong>מקור (Source):</strong> ${utm_source || 'N/A'}</li>
              <li><strong>מדיה (Medium):</strong> ${utm_medium || 'N/A'}</li>
              <li><strong>קמפיין (Campaign):</strong> ${utm_campaign || 'N/A'}</li>
              <li><strong>מונח (Term):</strong> ${utm_term || 'N/A'}</li>
              <li><strong>תוכן (Content):</strong> ${utm_content || 'N/A'}</li>
            </ul>
            <p style="font-size: 12px; color: #666;">נשלח בתאריך: ${new Date().toLocaleString('he-IL')}</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email notification sent successfully.");
      } catch (error) {
        console.error("Failed to send email notification:", error);
      }
    }
    
    // Simulate success
    res.status(201).json({ 
      success: true, 
      message: "Lead saved and email sent successfully",
      data: { name, phone, email, utm_source, utm_medium, utm_campaign, utm_term, utm_content }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
