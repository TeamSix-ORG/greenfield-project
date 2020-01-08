var users = require('./dummy-data.js');
var userprofile = require('./dummy-data.js');
var events = require('./dummy-data.js');
var mongoose = require('mongoose');
var User = require('./database-mongo/users.js');
var Pofile = require('./database-mongo/user-profile.js');
var Event = require('./database-mongo/events.js');

mongoose.connect('mongodb://localhost/events', {
	useMongoClient: true
});

var seedDb = function(users, userprofile, events) {
	for (var i = 0; i < users.users.length; i++) {
		User.save(users.users[i], (err, res) => {
			if (err) {
				return err;
			} else {
				console.log('database is populated');
			}
		});
	}
	for (var i = 0; i < userprofile.userprofile.length; i++) {
		Pofile.save(userprofile.userprofile[i], (err, res) => {
			if (err) {
				return err;
			} else {
				console.log('database is populated');
			}
		});
	}
	for (var i = 0; i < events.events.length; i++) {
		Event.save(events.events[i], (err, res) => {
			if (err) {
				return err;
			} else {
				console.log('database is populated');
			}
		});
	}
};

seedDb(users, userprofile, events);
