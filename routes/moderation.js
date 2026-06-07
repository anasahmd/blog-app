import { Router } from 'express';
import moderationController from '../controllers/moderation.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const moderationRouter = Router();

// !!! All middlewares are being applied in index file

moderationRouter.get('/pending', moderationController.getPendingPosts);

moderationRouter.patch('/:id/approve', moderationController.approvePost);

moderationRouter.patch('/:id/reject', moderationController.rejectPost);

moderationRouter.patch('/:id/flag', moderationController.flagPost);

export default moderationRouter;
