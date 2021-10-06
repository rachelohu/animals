////////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

const mongoose = require("./connection")
const Animal = require("./animal")

mongoose.connection.on("open", () => {
    // Run database queries in this function
  
    // create array of starter
  const startAnimals = [
      { name: "Lemur", location: "Madagascar", extinct: false },
      { name: "Polar Bear", location: "Arctic", extinct: false },
      { name: "Panda", location: "China", extinct: false },
      { name: "Koala", location: "Australia", extinct: false },
      { name: "Lion", location: "Africa", extinct: false },
    ];
  
  // Delete all animals
  Animal.deleteMany({}, (err, data) => {
    //seed starter animals
    Animal.create(startAnimals, (err, data) => {
        console.log("-------ANIMALS CREATED---------")
        console.log(data)
        console.log("-------ANIMALS CREATED---------")
    })


})
});