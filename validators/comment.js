export const commentCreateSchema = {
	body: {
		exists: {
			errorMessage: 'Body is required',
		},
		notEmpty: {
			errorMessage: 'Body cannot be empty',
		},
		trim: true,
		isLength: {
			options: { min: 2 },
			errorMessage: 'Body should be atleast 2 characters',
		},
	},

	parentComment: {
		optional: true,
		isMongoId: {
			errorMessage: 'The provided ID is not a valid MongoDB ObjectId',
		},
	},
};
