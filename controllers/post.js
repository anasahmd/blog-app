import { validationResult } from 'express-validator';
import Post from '../models/post.js';
import slugify from 'slugify';
import Category from '../models/category.js';
import Comment from '../models/comment.js';

const postController = {};

postController.getPosts = async (req, res) => {
	const posts = await Post.find();
	res.json(posts);
};

postController.createPost = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, content, category: categoryId, tags, coverImage } = req.body;

	const category = await Category.findOne({ _id: categoryId });

	if (!category) {
		return res.status(400).json({ error: 'Category not found' });
	}

	let post = new Post({ title, content, categoryId, coverImage });

	post.slug = slugify(title + ' ' + Date.now(), { lower: true, strict: true });

	post.tags = [...new Set(tags)];

	post.author = req.userId;

	post = await post.save();

	res.status(201).json(post);
};

postController.getPostBySlug = async (req, res) => {
	const post = await Post.findOneAndUpdate(
		{ slug: req.params.slug },
		{ $inc: { views: 1 } },
		{ returnDocument: 'after' },
	);
	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	res.json(post);
};

postController.updatePostById = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, content, category: categoryId, tags, coverImage } = req.body;

	const category = await Category.findOne({ _id: categoryId });

	if (!category) {
		return res.status(400).json({ error: 'Category not found' });
	}

	const slug = slugify(title + ' ' + Date.now(), { lower: true, strict: true });

	const post = await Post.findOneAndUpdate(
		{ _id: req.params.id },
		{ title, content, slug, categoryId, tags: [...new Set(tags)], coverImage },
		{ returnDocument: 'after', runValidators: true },
	);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	res.status(201).json(post);
};

postController.deletePostById = async (req, res) => {
	const post = await Post.findOneAndDelete({
		_id: req.params.id,
	});

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	await Comment.deleteMany({ post: req.params.id });

	res.json(post);
};

postController.submitDraftForReview = async (req, res) => {
	const post = await Post.findOneAndUpdate(
		{ _id: req.params.id },
		{ status: 'pending' },
		{ returnDocument: 'after', runValidators: true },
	);

	if (!post) {
		return res.json(404).json({ message: 'Post not found' });
	}

	res.json({ post });
};

postController.likePostById = async (req, res) => {
	let post = await Post.findOne({ _id: req.params.id });

	if (!post) {
		return res.json(404).json({ message: 'Post not found' });
	}

	if (post.likes.includes(req.userId)) {
		post = await Post.findOneAndUpdate(
			{ _id: post._id },
			{ $pull: { likes: req.userId } },
			{ runValidators: true },
		);
	} else {
		post = await Post.findOneAndUpdate(
			{ _id: post._id },
			{ $push: { likes: req.userId } },
			{ runValidators: true },
		);
	}
	res.json(post);
};

postController.getLoggedInUserPosts = async (req, res) => {
	const posts = await Post.find({ author: req.userId });
	res.json(posts);
};

export default postController;
