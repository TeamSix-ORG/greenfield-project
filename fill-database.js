var users = require('./dummy-data.js');
var userprofile = require('./dummy-data.js');
var events = require('./dummy-data.js');
var mongoose = require('mongoose');

var Event = require('./database-mongo/events.js');

var dbName = 'events';
mongoose.connect(`mongodb://localhost/${dbName}`, { useUnifiedTopology: true, useNewUrlParser: true }, function(
	err,
	db
) {
	if (err) throw err;
	console.log(`database ${dbName} was created`);
});

var seedDb = function(events) {
	for (var i = 0; i < events.events.length; i++) {
		Event.save(events.events[i], (err, res) => {
			if (err) {
				return err;
			} else {
				console.log('database is populated events');
			}
		});
	}
};

seedDb(users, userprofile, events);
