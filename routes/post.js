import { Router } from 'express';
import postController from '../controllers/post.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import checkPostOwnerShip from '../middlewares/checkPostOwnerShip.js';
import { checkSchema } from 'express-validator';
import { postCreateSchema } from '../validators/post.js';

const postRouter = Router();

postRouter
	.route('/')
	.get(postController.getPosts)
	.post(
		authMiddleware,
		roleMiddleware(['author', 'admin']),
		checkSchema(postCreateSchema),
		postController.createPost,
	);

postRouter.get('/:slug', postController.getPostBySlug);

postRouter
	.route('/:id')
	.put(
		authMiddleware,
		checkPostOwnerShip,
		checkSchema(postCreateSchema),
		postController.updatePostById,
	)
	.delete(authMiddleware, checkPostOwnerShip, postController.deletePostById);

postRouter.patch(
	'/:id/submit',
	authMiddleware,
	checkPostOwnerShip,
	postController.submitDraftForReview,
);

postRouter.patch('/:id/like', authMiddleware, postController.likePostById);

postRouter.get(
	'/my',
	authMiddleware,
	roleMiddleware(['author, admin']),
	postController.getLoggedInUserPosts,
);

export default postRouter;
