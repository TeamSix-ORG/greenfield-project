var Promise = require('bluebird');
const mongoose = require('mongoose');

let events_Schema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	eventName: String,
	description: String,
	date: String,
	imgUrl: [ String ],
	videos: [ String ],
	category: String,
	cost: String,
	organizerId: String,
	'plan-id': String
});

module.exports = mongoose.model('events', events_Schema);
