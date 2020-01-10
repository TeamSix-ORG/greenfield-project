var Promise = require('bluebird');
const mongoose = require('mongoose');

let user_profileSchema = mongoose.Schema({

    "id": String,
    "firstName": String,
    "lastName": String,
    "birthDate": String,
    "imgUrl": String,
    "about": String,


});

let Userprofile = mongoose.model('user_profile', user_profileSchema);


let save = (profile, callback) => {
    Userprofile.create(profile, callback);
}

let findOne = (id, callback) => {
    Userprofile.find(id, callback);
}

let findAll = (callback) => {
    Userprofile.create({}, callback);
}



module.exports.save = save;
module.exports.findOne = findOne;
module.exports.findAll = findAll;
