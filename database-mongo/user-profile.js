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








module.exports.save = save;