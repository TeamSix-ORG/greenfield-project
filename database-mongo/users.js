
var Promise = require('bluebird');
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({

        username: String,
        password: String,


});

let User = mongoose.model('users', userSchema);


let save = (user) => {
 
 
}








module.exports.save = save;





