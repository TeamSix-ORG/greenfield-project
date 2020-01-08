var Promise = require('bluebird');
const mongoose = require('mongoose');

let events_Schema = mongoose.Schema({

    "id": String,
    "eventName": String,
    "description": String,
    "date": String,
    "imgUrl": [String],
    "videos": [String],
    "category": String,
    "cost": String,
    "organizerId": String,
    "plan-id": String,


});

let Events = mongoose.model('events', events_Schema);


let save = (event, callback) => {
    Events.create(event, callback);
}

let findAll = (callback) => {
    Events.find({}, callback);
}

let findOne = (event, callback) => {
    Events.find(event, callback);
}



module.exports.save = save;
module.exports.findAll = findAll;
module.exports.findOne = findOne;

