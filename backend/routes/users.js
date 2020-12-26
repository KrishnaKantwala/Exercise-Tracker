//API request and response for users

const User = require("../models/user.model"); //our model

const router = require("express").Router();

// root path so it can go to find and return JSON as result from the db
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// adding new user into db
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newuser = new User({ username });

  newuser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
