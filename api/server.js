const express = require("express");
const fs = require("fs");
const app = express();
const nodeMailer = require("nodemailer");
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readFile("./public/index.html", "utf8", (err, html) => {
    if (err) {
      res.status(500).send("Not working :/");
      return;
    }
    res.send(html);
  });
});

async function mail(name, email, message) {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const msg = `<h2>New message from your portfolio site</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>`;

  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    replyTo: email,
    subject: `From ${name}`,
    html: msg,
  });

  console.log("Message sent " + info.messageId);
}

app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await mail(name, email, message);
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("live at http://localhost:3000");
});
