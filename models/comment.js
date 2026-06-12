import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
	{
		body: {
			type: String,
			trim: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		parentComment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
		isHidden: {
			type: Boolean,
			default: false,
		},
		flaggedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true },
);

// Recursively deletes any child comment
commentSchema.post('findOneAndDelete', async function (comment, next) {
	if (!comment) return next();

	try {
		const children = await this.model.find({ parentComment: comment._id });

		for (const child of children) {
			await this.model.findByIdAndDelete(child._id);
		}

		next();
	} catch (err) {
		next(err);
	}
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
