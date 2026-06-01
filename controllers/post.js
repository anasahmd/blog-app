import { validationResult } from 'express-validator';
import Post from '../models/post.js';
import slugify from 'slugify';
import Category from '../models/category.js';

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
	const post = await Post.findOne({ slug: req.params.slug });
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

	const post = await Post.findOneAndUpdate(
		{ _id: req.params.id },
		{ title, content, categoryId, tags: [...new Set(tags)], coverImage },
		{ returnDocument: 'after', runValidators: true },
	);

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	// TODO: Figure out whether to update slug or not
	// post.slug = slugify(title + ' ' + Date.now(), { lower: true, strict: true });

	res.status(201).json(post);
};

postController.deletePostById = async (req, res) => {
	const post = await Post.findOneAndDelete({
		_id: req.params.id,
	});

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	res.json(post);
};

postController.submitDraftForReview = async (req, res) => {
	// TODO: implement this controller
	res.status(404).json({ error: 'Not implemented' });
};

postController.likePostById = async (req, res) => {
	// TODO: implement this controller
	res.status(404).json({ error: 'Not implemented' });
};

postController.getLoggedInUserPosts = async (req, res) => {
	// TODO: implement this controller
	res.status(404).json({ error: 'Not implemented' });
};

export default postController;
