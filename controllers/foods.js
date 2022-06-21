/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express");
const { route } = require("express/lib/application");
const { find } = require("../models/food");
const Food = require("../models/food");
const Day = require("../models/day");
/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
// async: dont run, i have to wait for find finish, before i run
//   router.get("/", async (req, res) => {
//     const fruits = await Fruit.find();
//     res.render("fruits/index.liquid", {
//       fruits,
//     });
//   });
// index route - SHOW ALL DAYS!!!
router.get("/", (req, res) => {
  // find all the fruits
  Day.find({ username: req.session.username })
    // render a template after they are found
    .then((days) => {
      console.log(days);
      res.render("days/index.liquid", { days });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// food create route
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // add user to req.body to track related user
  req.body.username = req.session.username;
  // create the new fruit
  Food.create(req.body)
    .then((foods) => {
      // redirect user to index page if successfully created item
      res.redirect("/day");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
///// HERE ///////
// index route - SHOW FOODS from specific DAY!!!
router.get("/day/._id", (req, res) => {
  // find all the fruits
  Food.find({ username: req.session.username })
    // render a template after they are found
    .then((foods) => {
      console.log(foods);
      res.render("foods/index.liquid", { foods });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
///////HERE///////
// food create route
router.post("/day/._id", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // add user to req.body to track related user
  req.body.username = req.session.username;
  // create the new fruit
  Food.create(req.body)
    .then((foods) => {
      // redirect user to index page if successfully created item
      res.redirect("/food");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// create day route
router.post("/newday", (req, res) => {
  req.body.username = req.session.username;
  Day.create(req.body)
    .then((day) => {
      // redirect user to index page if successfully created item
      console.log("day", day);
      res.redirect("/day");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new route
router.get("/new/:dayid", (req, res) => {
  res.render("foods/new.liquid", { dayid: req.params.dayid });
});
// get route for day
router.get("/newday", (req, res) => {
  res.render("days/newday.liquid");
});

// show route
router.get("/:dayid", (req, res) => {
  // get the id from params
  const id = req.params.dayid;
  console.log("Hello Motto This is what we want!")

  // find the particular fruit from the database
  Day.findById(id)
    .populate("foodEntries")
    .then((day) => {
      // render the template with the data from the database
      res.render("foods/index.liquid", { day, id });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});


//Modified Show Route for -
router.get("/foods/:foodid", (req, res) => {
  // get the id from params
  const id = req.params.foodid;
  console.log("Hello Motto This is what we want!")

  // find the particular fruit from the database
  Food.findById(id)
    .then((food) => {
      // render the template with the data from the database
      res.render("foods/show.liquid", { food });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});


//// Here and My SHOW (above) was changed to the foods/index page from the foods/show page///
router.post("/foods/:dayid", (req, res) => {
  req.body.username = req.session.username;
  Food.create(req.body)
    .then((food) => {
      Day.findById(req.params.dayid)
      .then((day) => {

      day.foodEntries.push(food._id)
      day.save()  
      console.log("food", food);
      console.log("day", day);
      // res.redirect("/day/:id/index.liquid");
      })
      // redirect user to index page if successfully created item
      
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route ** FOOD **
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Food.findById(id)
    .then((food) => {
      // render edit page and send fruit data
      res.render("foods/edit.liquid", { food });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route ** DAY **
router.get("/:id/edits", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Day.findById(id)
    .then((day) => {
      // render edit page and send fruit data
      res.render("days/edit.liquid", { day });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route
router.put("/:id", (req, res) => {
  console.log("What are we getting?")
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  // update the fruit
  Day.findByIdAndUpdate(id, req.body, { new: true })
    .then((food) => {
      // redirect to main page after updating
      res.redirect("/day");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Day.findByIdAndRemove(id)
    .then((food) => {
      // redirect to main page after deleting
      res.redirect("/day");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
