import { Router } from 'express';
import postController from '../controllers/post';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import checkPostOwnerShip from '../middlewares/checkPostOwnerShip';
import { checkSchema } from 'express-validator';
import { postCreateSchema } from '../validators/post';

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

postRouter.get('/slug', postController.getPostBySlug);

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
