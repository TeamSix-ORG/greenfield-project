const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database-mongo/index");
const path = require("path");
var Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { signUpValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");

const UserProfile = require("../database-mongo/user-profile.js");
const signup = require("./user/signup.js");
const User = require("../database-mongo/users.js");
const Event = require("../database-mongo/events.js");
const Joint = require("../database-mongo/jointEventUser.js");
var app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static(__dirname + "/../react-client/dist"));

// ####################################	SOFIAN	PORTS  ######################################### \\
app.post("/api/events", function(req, res) {
  var data = req.body;
  console.log(data);
  Event.findOne(data, (err, result) => {
    if (err) throw err;
    else if (result) res.send(result);
    else res.send("No Events with that name");
  });
});

app.get("/api/events", function(req, res) {
  console.log("hi");
  Event.findAll((err, result) => {
    if (err) throw err;
    else if (result) res.send(result);
    else res.send("No Events");
  });
});

// app.get('/api/jointEventUser', function(req, res) {
// 	Joint.findAll((err, result) => {
// 		if (err) throw err;
// 		else if (result) res.send(result);
// 	});
// });
// TO save Data in the array of the user
app.post("/api/profiles", function(req, res) {
  var data = req.body;
  console.log(data);
  UserProfile.findOne({ _userId: data.userId }, (err, result) => {
    result["attendedEvents"].push(data.eventId);
    result.save();
    res.send("Joined");
  });
});
app.post("/api/profile/:id", function(req, res) {
  const id = req.params.id;
  UserProfile.findOne({ _userId: id }, (err, result) => {
    res.send(result.attendedEvents);
  });
});
// ####################################	SOFIAN	PORTS  ######################################### \\

app.post("/api/signupuser", async (req, res) => {
  signup(req, res);
});
app.post("/api/login", async (req, res) => {
  // DATA VALIDATION
  const { error } = loginValidation({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  if (error) return res.status(400).json(error.details[0].message);
  //check email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Email does not exists");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("wrong password");
  //tokens

  const token = jwt.sign({ _id: user._id }, "greenfeild");
  //res.header('auth-token', token).json(token);
  res.send(user);
});

app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../react-client/dist")
  });
});
let port = 3001;

app.listen(port, function() {
  console.log(`listening, on port ${port}`);
});
