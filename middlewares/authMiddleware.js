import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'Invalid token' });
	}

	try {
		const token = authHeader.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decodedToken.userId;
		req.userRole = decodedToken.userRole;
		next();
	} catch (e) {
		res.status(401).json({ error: e.message });
	}
};

export default authMiddleware;
