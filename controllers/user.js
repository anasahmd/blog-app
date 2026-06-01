import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const userController = {};

userController.register = async (req, res) => {
	// Extract validation result form the validation middleware
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password, bio, avatar } = req.body;

	const user = new User({ name, email, bio, avatar });

	// Hash the password
	const salt = await bcrypt.genSalt();
	const hash = await bcrypt.hash(password, salt);
	user.password = hash;

	// Saving the user
	user.save();
	res.status(201).json(user);
};

userController.login = async (req, res) => {
	// Extract validation result form the validation middleware
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).json({ error: 'Invalid credentials' });
	}

	const isValidPassword = await bcrypt.compare(password, user.password);

	if (!isValidPassword) {
		return res.status(401).json({ error: 'Invalid credentials' });
	}

	const token = jwt.sign(
		{ userId: user._id, userRole: user.role },
		process.env.JWT_SECRET,
		{
			expiresIn: '7d',
		},
	);

	res.json({ token });
};

userController.getUserProfile = async (req, res) => {
	// TODO: implement this controller
	res.status(404).json({ error: 'Not implemented' });
};

userController.updateUserProfile = async (req, res) => {
	// TODO: implement this controller
	res.status(404).json({ error: 'Not implemented' });
};

export default userController;
