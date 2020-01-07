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

app.post('/signupuser', function(req, res) {
	console.log("jjjjjj")
	console.log(req.body)
});
app.post('/login',(req,res)=>{
	console.log(req.body)
	res.json('rrrr')
})
let port = 3001;

app.listen(port, function() {
	console.log(`listening, on port ${port}`);
});
