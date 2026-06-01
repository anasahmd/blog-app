export const postCreateSchema = {
	title: {
		exists: {
			errorMessage: 'Title is required',
		},
		notEmpty: {
			errorMessage: 'Title cannot be empty',
		},
		trim: true,
		isLength: {
			options: { min: 2 },
			errorMessage: 'Title should be atleast 2 characters',
		},
	},

	content: {
		exists: {
			errorMessage: 'Content is required',
		},
		notEmpty: {
			errorMessage: 'Content cannot be empty',
		},
		trim: true,
	},

	category: {
		exists: {
			errorMessage: 'Category is required',
		},
		notEmpty: {
			errorMessage: 'Category cannot be empty',
		},
		isMongoId: {
			errorMessage: 'The provided ID is not a valid MongoDB ObjectId',
		},
	},

	tags: {
		optional: true,
		isArray: {
			errorMessage: 'Tags must be an array',
		},
	},

	'tags.*': {
		in: ['body'],
		isString: {
			errorMessage: 'Tag must be string',
		},
		trim: true,
		isLength: {
			options: { min: 2 },
			errorMessage: 'Each tag must be at least 2 characters long',
		},
	},

	coverImage: {
		optional: true,
		trim: true,
		isURL: true,
	},
};
