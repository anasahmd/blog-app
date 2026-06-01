import { Router } from 'express';
import userController from '../controllers/user.js';
import { checkSchema } from 'express-validator';
import {
	userLoginSchema,
	userRegisterSchema,
	userUpdateSchema,
} from '../validators/user.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.post(
	'/register',
	checkSchema(userRegisterSchema),
	userController.register,
);

userRouter.post('/login', checkSchema(userLoginSchema), userController.login);

userRouter
	.route('/me')
	.get(authMiddleware, userController.getUserProfile)
	.put(
		authMiddleware,
		checkSchema(userUpdateSchema),
		userController.updateUserProfile,
	);

export default userRouter;
