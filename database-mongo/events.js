var Promise = require('bluebird');
const mongoose = require('mongoose');

let events_Schema = mongoose.Schema({

    "id": String,
    "event-name": String,
    "description": String,
    "date": String,
    "img-url": [String],
    "videos": [String],
    "category": String,
    "organizer-id": String,
    "plan-id": String,


});

let Events = mongoose.model('events', events_Schema);


let save = (event, callback) => {
    Events.create(event, callback);

}








module.exports.save = save;