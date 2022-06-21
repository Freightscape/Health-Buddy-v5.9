/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require("./connection");
const Food = require("./food");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
const db = mongoose.connection;

// make sure code is not run until connected
db.on("open", () => {
  // array of starter fruits
  const startFoods = [
    {
      food: "Protien Shake",
      calories: 230,
      protien: 36,
      fat: 15,
      carbs: 5,
      satiating: false,
      meal: "Snack",
      totalCaloriesRemaining: 150,
      endOfDayWeight: 210,
    },
    {
      food: "Egg Whites",
      calories: 90,
      protien: 28,
      fat: 0,
      carbs: 0,
      satiating: true,
      meal: "Breakfast",
      totalCaloriesRemaining: 75,
      endOfDayWeight: 210,
    },
    {
      food: "Protien Pizza",
      calories: 370,
      protien: 51,
      fat: 34,
      carbs: 47,
      satiating: false,
      meal: "Lunch",
      totalCaloriesRemaining: 200,
      endOfDayWeight: 210,
    },
    {
      food: "Sirloin Steak",
      calories: 570,
      protien: 47,
      fat: 37,
      carbs: 42,
      satiating: true,
      meal: "Dinner",
      totalCaloriesRemaining: 270,
      endOfDayWeight: 209,
    },
  ];

  // Delete all fruits
  Food.deleteMany({})
    .then((deletedFoods) => {
      // add the starter fruits
      Food.create(startFoods)
        .then((newFoods) => {
          // log the new fruits to confirm their creation
          console.log(newFoods);
          db.close();
        })
        .catch((error) => {
          console.log(error);
          db.close();
        });
    })
    .catch((error) => {
      console.log(error);
      db.close();
    });
  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
});

// router.get("/seed", (req, res) => {
//     // array of starter fruits
//     const startFruits = [
//       { name: "Orange", color: "orange", readyToEat: false },
//       { name: "Grape", color: "purple", readyToEat: false },
//       { name: "Banana", color: "orange", readyToEat: false },
//       { name: "Strawberry", color: "red", readyToEat: false },
//       { name: "Coconut", color: "brown", readyToEat: false },
//     ];

//     // Delete all fruits
//     Fruit.deleteMany({}).then((data) => {
//       // Seed Starter Fruits
//       Fruit.create(startFruits).then((data) => {
//         // send created fruits as response to confirm creation
//         res.json(data);
//       });
//     });
//   });
