import express from 'express';
import  { AuthController } from './controller.js';

export const authRouter = () => {
  const authController = new AuthController();
  const router = express.Router();
  router.post('/token', authController.getToken);
  return router;
}

