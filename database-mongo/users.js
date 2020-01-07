var Promise = require('bluebird');
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({

        "id": String,
        "user-name": String,
        "password": String,
        "email": String,
        "type": String,
        "profile-id": String,
});

let User = mongoose.model('users', userSchema);


let save = (user, callback) => {
        User.create(user, callback);

}
module.exports.save = save;





