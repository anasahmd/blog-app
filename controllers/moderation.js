import Post from '../models/post.js';

const moderationController = {};

moderationController.getPendingPosts = async (req, res) => {
	const posts = await Post.find({ status: 'pending' });
	res.json(posts);
};

moderationController.approvePost = async (req, res) => {
	const post = await Post.findOneAndUpdate(
		{ _id: req.params.id },
		{ status: 'published' },
		{ returnDocument: 'after', runValidators: true },
	);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}
	res.json(post);
};

moderationController.rejectPost = async (req, res) => {
	const { feedback } = req.body;

	if (!feedback || typeof feedback !== 'string') {
		return res.status(400).json({ error: 'Please provide a valid feedback' });
	}

	const post = await Post.findOneAndUpdate(
		{ _id: req.params.id },
		{ status: 'rejected', rejectionReason: feedback },
		{ returnDocument: 'after', runValidators: true },
	);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	res.json(post);
};

moderationController.flagPost = async (req, res) => {
	// TODO: implement this controller
	res.status(404).json({ error: 'Not implemented' });
};

export default moderationController;
