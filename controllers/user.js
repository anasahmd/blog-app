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

	try {
		const user = new User({ name, email, bio, avatar });

		// Hash the password
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(password, salt);
		user.password = hash;

		// Saving the user
		user.save();
		res.status(201).json(user);
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

userController.login = async (req, res) => {
	// Extract validation result form the validation middleware
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		res.json({ token });
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

export default userController;
