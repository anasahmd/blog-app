import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import commentController from '../controllers/comment.js';

const commentRouter = Router();

commentRouter.delete(
	'/:id',
	authMiddleware,
	roleMiddleware(['admin', 'comment-owner', 'moderator']),
	commentController.deleteComment,
);

commentRouter.patch('/:id/hide', authMiddleware, commentController.hideComment);

commentRouter.patch('/:id/flag', authMiddleware, commentController.flagComment);

export default commentRouter;
