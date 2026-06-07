import User from '../models/user.js';

const adminController = {};

adminController.getAllUsers = async (req, res, next) => {
	const users = await User.find();

	res.json(users);
};

adminController.changeUserRole = async (req, res, next) => {
	const user = await User.findOne({ _id: req.params.id })
};

adminController.banUnbanUser = async (req, res, next) => {
	res.json('Not implemented');
};

adminController.getStatistics = async (req, res, next) => {
	res.json('Not implemented');
};

export default adminController;
