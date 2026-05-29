import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		res.status(401).json({ error: 'Invalid token' });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decodedToken.userId;
		req.userRole = decodedToken.userRole;
		next();
	} catch (e) {
		res.status(401).json({ error: e.message });
	}
};

export default authMiddleware;
