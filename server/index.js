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
var app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static(__dirname + "/../react-client/dist"));

// ####################################	SOFIAN	PORTS  ######################################### \\

//######### TO GET ONE EVENTS WHEN CALLED UPON #########\\
app.post("/api/events", function(req, res) {
  var data = req.body;
  console.log(data);
  Event.findOne(data, (err, result) => {
    if (err) throw err;
    else if (result) res.send(result);
    else res.send("No Events with that name");
  });
});
//##########################################################\\
//######### TO GET ALL THE EVENTS WHEN CALLED UPON #########\\
app.get("/api/events", function(req, res) {
  Event.findAll((err, result) => {
    if (err) throw err;
    else if (result) res.send(result);
    else res.send("No Events");
  });
});
//##########################################################\\
//######### TO SAVE ATTENDED EVENTS IN THE ARRAY OF THE USER PROFILE #########\\

app.post("/api/profiles", function(req, res) {
  var data = req.body;
  console.log(data);
  UserProfile.findOne({ _userId: data.userId }, (err, result) => {
    result["attendedEvents"].push(data.eventId);
    result.save();
    res.send("Joined");
  });
});
//##########################################################\\
//######### TO FIND ONE USER PROFILE AND SEND THE ATTENDED EVENTS ARRAY #########\\

app.post("/api/profile/:id", function(req, res) {
  const id = req.params.id;
  // console.log(id);
  UserProfile.findOne({ _userId: id }, (err, result) => {
    res.send(result.attendedEvents);
  });
});
//##########################################################\\
//######### TO FIND ONE USER PROFILE #########\\

app.post("/api/users/:id", function(req, res) {
  const id = req.params.id;
  UserProfile.findOne({ _userId: id }, (err, result) => {
    res.send(result);
  });
});
//##########################################################\\
//######### TO UPDATE PROFILE #########\\

app.put("/api/users/:id", function(req, res) {
  const id = req.params.id;
  UserProfile.findOneAndUpdate({ _userId: id }, req.body, (err, result) => {
    if (err) throw err;
    else res.send("yes");
  });
});
//##########################################################\\
//######### TO DELETE CANCELED EVENTS IN THE ARRAY #########\\

app.post(`/api/user/:id`, (req, res) => {
  const data = req.body;
  const id = req.params.id;
  UserProfile.findOne({ _userId: id }, (err, results) => {
    if (err) throw err;
    else {
      console.log(data["attendedEvents[]"]);
      for (var i = 0; i < results["attendedEvents"].length; i++) {
        if (data["attendedEvents[]"] === results["attendedEvents"][i]) {
          results["attendedEvents"].splice(i, 1);
          console.log(results);
        }
        results.save();
      }
      res.send("cool");
    }
  });
});
//##########################################################\\
//######### TO ADD COMMENTS #########\\
app.post(`/api/comment/:id`, (req, res) => {
  const eventId = req.params.id;
  const data = req.body;
  Event.findOne({ _id: eventId }, (err, result) => {
    if (err) throw err;
    else if (result) {
      result["comments"]["comment"].push(data);
      result.save();
      res.send("Comment Was Sent");
    } else {
      res.sendStatus(400);
    }
  });
});
//##########################################################\\

// CAN BE MOR OPTIMIZED BUT HAVE NO TIME
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
