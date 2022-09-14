///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// Init .env vars
require("dotenv").config();

const { PORT, MONGO_KEY } = process.env;

const express = require("express");
const app = express();

// Add in mongoose
const mongoose = require('mongoose');
mongoose.connect(MONGO_KEY)

// My controllers 
const peopleController = require('./controllers/people-controller')

// Cors and morgan
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////

// Connection Events
mongoose.connection
  .on("open", () => console.log("This is my awesome amazing connection"))
  .on("close", () => console.log("You are disconnected from mongoose :'("))
  .on("error", (error) => console.log(error));


///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(express.json()); //parse json
app.use(cors()); //We now pray to whatever higher power or God we have that this works
app.use(morgan("dev"));

app.use('/people', peopleController);

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route



app.get("/", (req, res) => {
    res.send("Hello world");
})

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => {
    console.log(`I'm totally listening to you on port ${PORT}`)
})