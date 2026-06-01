import User from '../models/user.js';

export const userRegisterSchema = {
	name: {
		exists: {
			errorMessage: 'Name is required',
		},
		notEmpty: {
			errorMessage: 'Name cannot be empty',
		},
		trim: true,
		isLength: { options: { min: 2 } },
	},
	email: {
		exists: {
			errorMessage: 'Email is required',
		},
		notEmpty: {
			errorMessage: 'Email cannot be empty',
		},
		isEmail: {
			errorMessage: 'Email should be of valid format',
		},
		trim: true,
		normalizeEmail: true,
		custom: {
			options: async function (value) {
				try {
					const user = await User.findOne({ email: value });

					if (user) {
						throw new Error('Email already taken');
					}
				} catch (err) {
					throw new Error(err.message);
				}

				return true;
			},
		},
	},
	password: {
		exists: {
			errorMessage: 'Password is required',
		},
		notEmpty: {
			errorMessage: 'Password cannot be empty',
		},
		isStrongPassword: {
			options: {
				minLenght: 8,
				minLowerCase: 1,
				minUpperCase: 1,
				minNumber: 1,
				minSymbol: 1,
			},
			trim: true,
			errorMessage:
				'Password must contain atleast one lowercase, one uppercase, one number and one symblol and it must be minimum 8 characters long.',
		},
	},
	bio: {
		optional: true,
	},
	avatar: {
		optional: true,
		trim: true,
		isURL: true,
	},
};

export const userLoginSchema = {
	email: {
		exists: {
			errorMessage: 'Email is required',
		},
		notEmpty: {
			errorMessage: 'Email cannot be empty',
		},
		isEmail: {
			errorMessage: 'Email should be of valid format',
		},
		trim: true,
		normalizeEmail: true,
	},
	password: {
		exists: {
			errorMessage: 'Password is required',
		},
		notEmpty: {
			errorMessage: 'Password cannot be empty',
		},
		isStrongPassword: {
			options: {
				minLenght: 8,
				minLowerCase: 1,
				minUpperCase: 1,
				minNumber: 1,
				minSymbol: 1,
			},
			trim: true,
			errorMessage:
				'Password must contain atleast one lowercase, one uppercase, one number and one symblol and it must be minimum 8 characters long.',
		},
	},
};

// TODO: Implement user update schema
export const userUpdateSchema = {};
