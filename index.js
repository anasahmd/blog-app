import express from 'express';
import dotenv from 'dotenv';
import configureDB from './config/db.js';
import userController from './controllers/user.js';
import { checkSchema } from 'express-validator';
import { userLoginSchema, userRegisterSchema } from './validators/user.js';
dotenv.config();
const PORT = process.env.PORT || 3636;

const app = express();
configureDB();

app.use(express.json());

app.get('/', (req, res) => {
	res.json('Hello World!');
});

app.post(
	'/api/auth/register',
	checkSchema(userRegisterSchema),
	userController.register,
);

app.post('/api/auth/login', checkSchema(userLoginSchema), userController.login);

app.listen(PORT, () => {
	console.log('Listening on PORT: ' + PORT);
});
