/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs"); // to utilise passwords sth

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", async (req, res) => {
  //   res.send("signup");
  //encrypt password
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10) // 10 random characters added to it, and then bcrypt encrypted it. This takes time, so need to await
  );
  // create user
  User.create(req.body)
    .then((user) => {
      // redirect to login page
      res.redirect("/user/login");
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  //   res.send("login");
  // get data from the request body
  const { username, password } = req.body; // search for user
//   User.findOne({ username: username })
// shortcut when username field is same name as 'username'
  User.findOne({ username })
    .then(async (user) => {
      // check if user exists
      if (user) {
        // compare password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            // store some properties in the session object
            req.session.username = username
            req.session.loggedIn = true
          // redirect to fruits page if successful
          res.redirect("/fruits");
        } else {
          // error if password doesn't match
          res.json({ error: "password doesn't match" });
        }
      } else {
        // send error if user doesn't exist
        res.json({ error: "user doesn't exist" });
      }
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});

router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
      res.redirect("/");
    });
  });
  

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
