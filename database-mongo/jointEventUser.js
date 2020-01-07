var Promise = require('bluebird');
const mongoose = require('mongoose');

let jointTable_Schema = mongoose.Schema({

    "userId": String,
    "eventId": String


});

let JointTable = mongoose.model('JointTable_Schema', jointTable_Schema);


let save = (event, callback) => {
    JointTable.create(event, callback);
}

let findAll = (callback) => {
    JointTable.find({}, callback);
}

let findOne = (event, callback) => {
    JointTable.find(event, callback);
}



module.exports.save = save;
module.exports.findAll = findAll;
module.exports.findOne = findOne;

