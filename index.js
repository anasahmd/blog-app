import express from 'express';
import dotenv from 'dotenv';
import configureDB from './config/db.js';
import categoryRouter from './routes/category.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';
import authMiddleware from './middlewares/authMiddleware.js';
import roleMiddleware from './middlewares/roleMiddleware.js';
import moderationRouter from './routes/moderation.js';
dotenv.config();
const PORT = process.env.PORT || 3636;

const app = express();
configureDB();

app.use(express.json());

app.get('/', (req, res) => {
	res.json('Hello World!');
});

// User Authentication routes
app.use('/api/auth', userRouter);

// Category Router
app.use('/api/categories', categoryRouter);

// Post router
app.use('/api/posts', postRouter);

app.use(
	'/api/moderation',
	authMiddleware,
	roleMiddleware(['moderator', 'admin']),
	moderationRouter,
);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ error: 'Unknown Endpoint' });
});

// Error handler
app.use((err, req, res, next) => {
	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	}

	console.log(err);

	res.json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
	console.log('Listening on PORT: ' + PORT);
});
