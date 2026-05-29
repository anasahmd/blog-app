import express from 'express';
import dotenv from 'dotenv';
import configureDB from './config/db.js';
import userController from './controllers/user.js';
import { checkSchema } from 'express-validator';
import { userLoginSchema, userRegisterSchema } from './validators/user.js';
import authMiddleware from './middlewares/authMiddleware.js';
import roleMiddleware from './middlewares/roleMiddleware.js';
import {
	categoryPostSchema,
	categoryUpdateSchema,
} from './validators/category.js';
import categoryController from './controllers/category.js';
dotenv.config();
const PORT = process.env.PORT || 3636;

const app = express();
configureDB();

app.use(express.json());

app.get('/', authMiddleware, roleMiddleware(['author']), (req, res) => {
	res.json('Hello World!');
});

// User Authentication routes
app.post(
	'/api/auth/register',
	checkSchema(userRegisterSchema),
	userController.register,
);
app.post('/api/auth/login', checkSchema(userLoginSchema), userController.login);

// Category routes
app.get('/api/categories', categoryController.listAllCategories);
app.post(
	'/api/categories',
	authMiddleware,
	roleMiddleware('admin'),
	checkSchema(categoryPostSchema),
	categoryController.postCategory,
);
app.put(
	'/api/categories/:id',
	authMiddleware,
	roleMiddleware('admin'),
	checkSchema(categoryUpdateSchema),
	categoryController.updateCategory,
);
app.delete(
	'/api/categories/:id',
	authMiddleware,
	roleMiddleware('admin'),
	categoryController.deleteCategory,
);

app.listen(PORT, () => {
	console.log('Listening on PORT: ' + PORT);
});
