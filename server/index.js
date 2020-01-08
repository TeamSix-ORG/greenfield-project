const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index');
const path = require('path');
var Mongoose = require('mongoose')
const User = require('../database-mongo/users')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('*', (req, res) => {
	res.sendFile('index.html', { root: path.join(__dirname, '../react-client/dist') });
});

app.post('/signupuser', async (req, res)=> {
	const user = new User({
		_id: new Mongoose.Types.ObjectId(),
		username:req.body.username,
		fullname: req.body.name,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
		type: req.body.type,
		profileId: "110", 
	})
	try {
		const savedUser = await user.save()
		console.log(savedUser)
		res.json(savedUser)
	} catch(err){
		console.log(err)
		res.status(400).json(err)
	}
});
app.post('/login',(req,res)=>{
	console.log(req.body.username)
	res.json('rrrr')
})
let port = 3001;

app.listen(port, function() {
	console.log(`listening, on port ${port}`);
});
