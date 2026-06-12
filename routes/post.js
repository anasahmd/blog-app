import { Router } from 'express';
import postController from '../controllers/post.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { checkSchema } from 'express-validator';
import { postCreateSchema } from '../validators/post.js';
import commentController from '../controllers/comment.js';
import { commentCreateSchema } from '../validators/comment.js';

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

postRouter.get(
	'/my',
	authMiddleware,
	roleMiddleware(['author', 'admin']),
	postController.getLoggedInUserPosts,
);

postRouter.get('/:slug', postController.getPostBySlug);

postRouter
	.route('/:id')
	.put(
		authMiddleware,
		roleMiddleware(['post-owner', 'admin']),
		checkSchema(postCreateSchema),
		postController.updatePostById,
	)
	.delete(
		authMiddleware,
		roleMiddleware(['post-owner', 'admin']),
		postController.deletePostById,
	);

postRouter.patch(
	'/:id/submit',
	authMiddleware,
	roleMiddleware(['post-owner']),
	postController.submitDraftForReview,
);

postRouter.patch('/:id/like', authMiddleware, postController.likePostById);

// Comment routes
postRouter.get('/:id/comments', commentController.getComments);

postRouter.post(
	'/:id/comments',
	authMiddleware,
	checkSchema(commentCreateSchema),
	commentController.postComment,
);

export default postRouter;
