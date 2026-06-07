import Category from '../models/category.js';
import Post from '../models/post.js';
import User from '../models/user.js';

const adminController = {};

adminController.getAllUsers = async (req, res, next) => {
	const users = await User.find();

	res.json(users);
};

adminController.changeUserRole = async (req, res, next) => {
	const { role } = req.body;

	if (!['moderator', 'author'].includes(role)) {
		return res.status(400).json({ error: `Can't set role to ${role}` });
	}

	const user = await User.findOne({ _id: req.params.id });

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	if (user.role === 'admin') {
		return res.status(400).json({ error: "Can't change an admin's role" });
	}

	user.role = role;
	await user.save();
	return res.json(user);
};

adminController.banUnbanUser = async (req, res, next) => {
	const user = await User.findOne({ _id: req.params.id });

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	if (user.role === 'admin') {
		return res.status(400).json({ error: "Can't ban an admin" });
	}

	user.isBanned = !user.isBanned;
	await user.save();
	return res.json(user);
};

adminController.getStatistics = async (req, res, next) => {
	const users = await User.find();
	const categories = await Category.find();
	const posts = await Post.find();

	res.json({
		stats: {
			totalUsers: users.length,
			totalPosts: posts.length,
			totalCategories: categories.length,
		},
		data: {
			users,
			posts,
			categories,
		},
	});
};

export default adminController;
