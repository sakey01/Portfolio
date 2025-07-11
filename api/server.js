const express = require("express");
const fs = require("fs");
const app = express();
const nodeMailer = require("nodemailer");
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// reads html and sends a live server
app.get("/", (req, res) => {
  fs.readFile("./public/index.html", "utf8", (err, html) => {
    if (err) {
      res.status(500).send("Not working :/");
      return;
    }
    res.send(html);
  });
});

// set up mail package
async function mail(name, email, message) {
  const transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const msg = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: "Arial, sans-serif";
          background-color: #f9f9f9;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <div>
        <h2>📬 New Message from Your Portfolio</h2>
        <p><span>Email:</span> ${email}</p>
        <p>Message:</p>
        <p>${message}</p>
      </div>
    </body>
  </html>`;

  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    replyTo: email,
    subject: `From ${name}`,
    html: msg,
  });

  console.log("Message sent " + info.messageId);
}

// send mail
app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  // Log the request for debugging
  console.log("Received contact form submission:", { name, email, message: message?.substring(0, 50) + "..." });

  // Basic validation
  if (!name || !email || !message) {
    console.log("Missing required fields");
    return res.status(400).json({ success: false, message: "Please fill in all fields." });
  }

  try {
    await mail(name, email, message);
    console.log("Email sent successfully");
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (e) {
    console.error("Email sending failed:", e.message);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// waits for a response
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
  console.log(`Health check: http://localhost:${process.env.PORT || 3000}/health`);
});
