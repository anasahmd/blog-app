import Category from '../models/category.js';

export const categoryPostSchema = {
	name: {
		exists: {
			errorMessage: 'Name is required',
		},
		notEmpty: {
			errorMessage: 'Name cannot be empty',
		},
		trim: true,
		isLength: {
			options: { min: 2 },
			errorMessage: 'Name should be atleast 2 characters',
		},
		custom: {
			options: async function (value) {
				try {
					const category = await Category.findOne({ name: value });

					if (category) {
						throw new Error('Category already exists');
					}
				} catch (err) {
					throw new Error(err.message);
				}

				return true;
			},
		},
	},
	description: {
		optional: true,
	},
	isActive: {
		optional: true,
		isIn: {
			options: [[true, false]],
			errorMessage: 'isActive should be either true or false',
		},
	},
};

export const categoryUpdateSchema = {
	name: {
		exists: {
			errorMessage: 'Name is required',
		},
		notEmpty: {
			errorMessage: 'Name cannot be empty',
		},
		trim: true,
		isLength: {
			options: { min: 2 },
			errorMessage: 'Name should be atleast 2 characters',
		},
		custom: {
			options: async function (value, { req }) {
				try {
					const category = await Category.findOne({
						name: value,
					}).collation({ locale: 'en', strength: 2 });

					if (category && category._id.toString() !== req.params.id) {
						throw new Error('Category already exists');
					}
				} catch (err) {
					throw new Error(err.message);
				}

				return true;
			},
		},
	},
	description: {
		optional: true,
	},
	isActive: {
		optional: true,
		isIn: {
			options: [[true, false]],
			errorMessage: 'isActive should be either true or false',
		},
	},
};
