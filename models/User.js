import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['author', 'moderator', 'admin'],
			default: 'author',
		},
		bio: {
			type: String,
			trim: true,
		},
		avatar: String,
		isBanned: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
