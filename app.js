const express     = require('express'),
      mongoose    = require('mongoose'),
      dotenv      = require('dotenv'),
      bodyParser  = require('body-parser'),
      Email       = require('./models/email');

const app = express();
dotenv.config();

// Middleware mounting
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


// mongodb+srv://jjahammond:<password>@studiodoor-0rdn1.mongodb.net/test?retryWrites=true&w=majority
const mongoDBURL = process.env.MONGODB_URL;
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.log('ERROR:', err.message);
});


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  newEmail = req.body;

  // Save to database
  Email.findOne(newEmail, (err, foundOne) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      if (!foundOne) {
        Email.create(newEmail, (err, newCreated) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Email added to db");
            res.redirect("/submitted");
          }
        });
      } else {
        console.log("Email exists in db");
        res.redirect("/submitted");
      }
    }
  });
});

app.get("/submitted", (req, res) => {
  res.render("submitted");
});

app.get("/*", (req, res) => {
  res.redirect("/");
});

// *************  Request listener *******************
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Server running on PORT 5000...")
});
