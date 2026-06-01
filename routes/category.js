import { Router } from 'express';
import categoryController from '../controllers/category.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { checkSchema } from 'express-validator';
import {
	categoryPostSchema,
	categoryUpdateSchema,
} from '../validators/category.js';

const categoryRouter = Router();

categoryRouter
	.route('/')
	.get(categoryController.listAllCategories)
	.post(
		authMiddleware,
		roleMiddleware('admin'),
		checkSchema(categoryPostSchema),
		categoryController.postCategory,
	);

categoryRouter
	.route('/')
	.put(
		authMiddleware,
		roleMiddleware('admin'),
		checkSchema(categoryUpdateSchema),
		categoryController.updateCategory,
	)
	.delete(
		authMiddleware,
		roleMiddleware('admin'),
		categoryController.deleteCategory,
	);

export default categoryRouter;
