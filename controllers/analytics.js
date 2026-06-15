import Post from '../models/post.js';
import Comment from '../models/comment.js';

const analyticsController = {};

analyticsController.getPostAnalytics = async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id });

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	const comments = await Comment.find({ post: post._id });

	return res.json({
		totalViews: post.views,
		totalComments: comments.length,
		totalLikes: post.likes.length,
	});
};

analyticsController.getOwnPostAnalytics = async (req, res) => {
	const posts = await Post.find({ author: req.userId });

	let postAnalytics = posts.map(async (post) => {
		const comments = await Comment.find({ post: post._id });

		return {
			id: post._id,
			slug: post.slug,
			totalViews: post.views,
			totalComments: comments.length,
			totalLikes: post.likes.length,
		};
	});

	postAnalytics = await Promise.all(postAnalytics);

	return res.json(postAnalytics);
};

export default analyticsController;
