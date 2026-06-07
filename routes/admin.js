import { Router } from 'express';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import adminController from '../controllers/admin.js';

const adminRouter = Router();

// !!! All middlewares are being applied in index file

adminRouter.get('/users', adminController.getAllUsers);

adminRouter.patch('/users/:id/role', adminController.changeUserRole);

adminRouter.patch('/users/:id/ban', adminController.banUnbanUser);

adminRouter.patch('/stats', adminController.getStatistics);

export default adminRouter;
