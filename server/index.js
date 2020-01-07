const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index');
const users = require('../database-mongo/users');
const path = require('path');

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('*', (req, res) => {
	res.sendFile('index.html', { root: path.join(__dirname, '../react-client/dist') });
});

app.post('/', function(req, res) {});

// Search request SOFIAN \\
app.get('/events', (req, res) => {
	var data = req.body

	Event.findOne(data, (err, result) => {
		if(err) throw err
		res.send(result)
	})
})
//####################################\\
let port = 3000;

app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
