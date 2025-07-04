const express = require("express");
const fs = require("fs");
const app = express();

// opens public (front end)
app.use(express.static("public"));

// reads html file
app.get("/", (req, res) => {
  fs.readFile("./public/index.html", "utf8", (err, html) => {
    // error handling
    if (err) {
      res.status(500).send("Not working :/");
      return;
    }
    // opens html server
    res.send(html);
  });
});

// live server access
app.listen(process.env.PORT || 3000, () => {
  console.log("live at http://localhost:3000");
});

// middleware to process html data
app.use(express.urlencoded({ extended: true }));

// post (event) stores data in objects
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Form submitted:", name, email, message);
  res.send("Done");
});
