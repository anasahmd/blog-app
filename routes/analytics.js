import { Router } from 'express';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import analyticsController from '../controllers/analytics.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const analyticsRouter = Router();

analyticsRouter.get(
	'/posts/:id',
	authMiddleware,
	roleMiddleware(['post-owner', 'admin']),
	analyticsController.getPostAnalytics,
);

analyticsRouter.get(
	'/my-posts',
	authMiddleware,
	roleMiddleware(['author', 'admin']),
	analyticsController.getOwnPostAnalytics,
);

export default analyticsRouter;
