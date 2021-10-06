////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Animal = require("../models/animal")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

///////////////////////////////////////
// router middleware
///////////////////////////////////////
router.use((req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect("/user/login")
    }
})

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
router.get("/animals/seed", (req, res) => {

    // array of starter animals
    const startAnimals = [
          { name: "Lemur", location: "Madagascar", extinct: false },
          { name: "Polar Bear", location: "Arctic", extinct: false },
          { name: "Panda", location: "China", extinct: false },
          { name: "Koala", location: "Australia", extinct: false },
          { name: "Lion", location: "Africa", extinct: false },
        ]
  
    // Delete all animals
    Animal.remove({}, (err, data) => {
      // Seed Starter Animals
      Animal.create(startAnimals,(err, data) => {
          // send created animals as response to confirm creation
          res.json(data);
        }
      );
    });
  });


// Index Route (Get => /animals)
router.get("/", (req, res) => {
    Animal.find({username: req.session.username}, (err, animals) => {
        res.render("animals/index.ejs", {animals})
    })
})

//New Route
router.get("/new", (req,res) => {
    res.render("animals/new.ejs")
})

//Destroy Route
router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the animal
    Animal.findByIdAndRemove(id, (err, animal) => {
        // redirect user back to index page
        res.redirect("/animals")
    })
})

//Update Route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // check if the extinct property should be true or false
    req.body.extinct = req.body.extinct === "on" ? true : false
    // update the animal
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
        // redirect user back to main page when animal 
        res.redirect("/animals")
    })
})

//Create Route
router.post("/", (req, res) => {
    // convert ready to eat to true or false
    req.body.extinct = req.body.extinct === "on" ? true : false
    // add the username to req.body
    req.body.username = req.session.username
    // create the new animal
    Animal.create(req.body, (err, animal) => {
        //send the user back to index
        res.redirect("/animals")
    })
})

//Edit Route
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the animal from the database
    Animal.findById(id, (err, animal) => {
        // render template and send it animal
        res.render("animals/edit.ejs", {animal})
    })
})


//Show Route
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id

    // find the particular animal from the database
    Animal.findById(id, (err, animal) => {
        // render the template with the data from the database
        res.render("animals/show.ejs", {animal})
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router