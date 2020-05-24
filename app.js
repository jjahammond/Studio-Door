const express = require('express'),
      app = express();

// Middleware mounting
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
})

// *************  Request listener *******************
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Server running on PORT 5000...")
});
