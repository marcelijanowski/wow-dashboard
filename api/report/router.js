import express from 'express';
import  { ReportController } from './controller.js';

export const reportRouter = () => {
  const reportController = new ReportController();
  const router = express.Router();
  router.get('/job/:id', reportController.getReport);
  router.post('/job', reportController.generateReport);
  return router;
}

