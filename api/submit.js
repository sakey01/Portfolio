const nodeMailer = require("nodemailer");

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
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    </body>
  </html>`;

  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    replyTo: email,
    subject: `Portfolio Contact: ${name}`,
    html: msg,
  });

  console.log("Message sent " + info.messageId);
}

// Vercel serverless function
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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
} 