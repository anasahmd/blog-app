const roleMiddleware = (allowedRoles) => {
	return (req, res, next) => {
		if (!allowedRoles.includes(req.userRole)) {
			return res.status(403).json('You are not allowed to access this');
		}
		next();
	};
};

export default roleMiddleware;
