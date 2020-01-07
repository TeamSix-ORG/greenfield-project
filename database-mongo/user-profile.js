var Promise = require('bluebird');
const mongoose = require('mongoose');

let user_profileSchema = mongoose.Schema({

    "id": String,
    "first-name": String,
    "last-name": String,
    "birth-date": String,
    "img-url": String,
    "about": String,


});

let Userprofile = mongoose.model('user_profile', user_profileSchema);


let save = (profile, callback) => {
    Userprofile.create(profile, callback);

}








module.exports.save = save;