import Post from '../models/post.js';

const roleMiddleware = (allowedRoles) => {
	return async (req, res, next) => {
		if (allowedRoles.includes('post-owner')) {
			const post = await Post.findOne({ _id: req.params.id });

			if (!post) {
				return res.status(404).json({ error: 'Post not found' });
			}

			if (
				req.userId !== post.author.toString() &&
				!allowedRoles.includes(req.userRole)
			) {
				return res
					.status(403)
					.json({ error: 'You are not allowed to access this' });
			}
		} else if (!allowedRoles.includes(req.userRole)) {
			return res
				.status(403)
				.json({ error: 'You are not allowed to access this' });
		}

		next();
	};
};

export default roleMiddleware;
