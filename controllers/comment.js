import { validationResult } from 'express-validator';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import mongoose from 'mongoose';

const commentController = {};

commentController.getComments = async (req, res) => {
	const comments = await Comment.find({ post: req.params.id });
	res.json({ comments });
};

commentController.postComment = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { body, parentComment: parentCommentId } = req.body;

	const post = await Post.findOne({ _id: req.params.id });

	if (!post) {
		return res.status(404).json({ error: 'Post not found' });
	}

	if (parentCommentId) {
		const parentCommet = await Comment.findOne({ _id: parentCommentId });

		if (!parentCommet) {
			return res.status(404).json({ error: 'Comment not found' });
		}
	}

	const comment = await Comment.create({
		body,
		post: post._id,
		author: req.userId,
		parentComment: parentCommentId,
	});

	res.status(201).json({ comment });
};

commentController.deleteComment = async (req, res) => {
	const deletedComment = await Comment.findOneAndDelete({ _id: req.params.id });

	if (!deletedComment) {
		return res.status(404).json({ error: 'Comment not found' });
	}

	res.json({ comment: deletedComment });
};

commentController.hideComment = async (req, res) => {
	const comment = await Comment.findOne({ _id: req.params.id });

	if (!comment) {
		return res.status(404).json({ error: 'Comment not found' });
	}

	comment.isHidden = !comment.isHidden;

	await comment.save();

	res.json(comment);
};

commentController.flagComment = async (req, res) => {
	const comment = await Comment.findOneAndUpdate(
		{ _id: req.params.id },
		{ $addToSet: { flaggedBy: req.userId } },
		{ runValidators: true, returnDocument: 'after' },
	);

	if (!comment) {
		return res.status(404).json({ error: 'Comment not found' });
	}

	res.json(comment);
};

export default commentController;
