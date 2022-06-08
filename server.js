/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const FruitRouter = require('./controllers/fruits')
const UserRouter = require("./controllers/users");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const { Store } = require("express-session");

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////

const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

// ### Register our Middleware

// ```js
/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use(session({
  secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
}))

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/fruits', FruitRouter) // send all "/fruits" routes to fruit router
app.use('/user', UserRouter)

app.get("/", (req, res) => {
  // res.send("your server is running... better catch it.");
  res.render('index')
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
