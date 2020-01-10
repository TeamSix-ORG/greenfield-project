var Promise = require("bluebird");
const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  id: String,
  "user-name": String,
  password: String,
  email: String,
  type: String,
  profileId: String
});

let User = mongoose.model("users", userSchema);

let save = (user, callback) => {
  User.create(user, callback);
};

let findOne = (user, callback) => {
  User.find(user, callback);
};

let findAll = callback => {
  User.create({}, callback);
};


module.exports.save = save;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
