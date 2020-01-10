var Mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { signUpValidation } = require('../../validation');
const bcrypt = require('bcryptjs');

const createprofile = require('./profile.js');
const User = require('../../database-mongo/users.js');

let signup = async (req, res) => {
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
		email: req.body.email,
		password: hashedPassword,
		type: req.body.type
	});
	try {
		const savedUser = await user.save();

		res.json(savedUser._id);
		try {
			createprofile(req, savedUser._id);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
};

module.exports = signup;
