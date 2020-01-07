const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index');
const users = require('../database-mongo/users');
const path = require('path');
const Event = require('../database-mongo/events.js')

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));


app.post('/', function (req, res) {});


app.post('/api/events', function (req, res) {
	var data = req.body
	
	Event.findOne(data, (err, result) => {
		if(err) throw err
		else if(result) res.send(result)
		else res.send('No Events with that name')
	})
});

app.get('/api/events', function (req, res) {
	Event.findAll((err, result) => {
		if(err) throw err
		else if(result) res.send(result)
		else res.send('No Events')
	})
});

app.get('*', (req, res) => {
	res.sendFile('index.html', {
		root: path.join(__dirname, '../react-client/dist')
	});
});

let port = 8000;

app.listen(port, function () {
	console.log(`listening on port ${port}`);
});