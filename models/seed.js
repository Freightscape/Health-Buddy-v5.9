/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require('mongoose')
const Fruit = require('./fruit')

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
const db = mongoose.connection

// make sure code is not run until connected
db.on('open', () => {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ];
    
      // Delete all fruits
      Fruit.deleteMany({})
        .then((deletedFruits) => {
          // add the starter fruits
          Fruit.create(startFruits)
            .then((newFruits) => {
              // log the new fruits to confirm their creation
              console.log(newFruits);
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
})

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