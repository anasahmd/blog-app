import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			index: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			enum: ['draft', 'pending', 'published', 'rejected'],
			default: 'draft',
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			require: true,
		},
		tags: [
			{
				type: String,
			},
		],
		coverImage: String,
		views: {
			type: Number,
			default: 0,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		flaggedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		rejectionReason: String,
	},
	{ timestamps: true },
);

const Post = mongoose.model('Post', postSchema);
export default Post;
