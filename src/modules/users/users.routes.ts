import { Router } from 'express';
import UsersController from './users.controller.js';

const router = Router();

router.post('/users', UsersController.create);

export default router;
