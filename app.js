const express = require('express'),
      app = express();

// Middleware mounting
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
})

app.listen(3000, () => {
  console.log("Application listening on port 3000...")
});
