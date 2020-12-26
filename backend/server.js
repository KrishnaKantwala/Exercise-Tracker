//
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //for the connection with db

// enviornment var file
require("dotenv").config();

// creattion of the server iwth port number
const app = express();
const port = process.env.PORT || 5000;

// Middle ware
app.use(cors());
app.use(express.json()); // allow us to parse JSON

//connetion with db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB db connection established successfully");
});

const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
