// TODO: Implement owner middleware
const checkPostOwnerShip = async (req, res, next) => {
	console.log('!!! Implement post owner middleware');
	if (req.userRole !== 'admin' && req.userRole !== 'author') {
		console.log(req.userRole);

		return res.status(403).json({ error: 'You do not have access to this' });
	}
	next();
};

export default checkPostOwnerShip;
