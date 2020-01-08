const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index');
const path = require('path');
var Mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../database-mongo/users');
const { signUpValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('*', (req, res) => {
	res.sendFile('index.html', {
		root: path.join(__dirname, '../react-client/dist')
	});
});

app.post('/signupuser', async (req, res) => {
	// DATA VALIDATION
	const { error } = signUpValidation({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	if (error) return res.status(400).json(error.details[0].message);

	//checking if the email exists
	const emaiExist = await User.findOne({ email: req.body.email });
	if (emaiExist) {
		res.status(400).json('Email already exists');
	}

	//hashing the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Creating a user
	const user = new User({
		_id: new Mongoose.Types.ObjectId(),
		username: req.body.username,
		fullname: req.body.name,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		password: hashedPassword,
		type: req.body.type,
		profileId: '110'
	});
	try {
		const savedUser = await user.save();
		console.log(savedUser);
		res.json(savedUser.username);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});
app.post('/login', async (req, res) => {
	// DATA VALIDATION
	const { error } = loginValidation({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	if (error) return res.status(400).json(error.details[0].message);
	//check email
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).json('Email does not exists');

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).json('wrong password');
	//tokens

	const token = jwt.sign({ _id: user._id }, 'greenfeild');
	res.header('auth-token', token).json(token);
});
let port = 3001;

app.listen(port, function() {
	console.log(`listening, on port ${port}`);
});
