import express from 'express';
import {
  getBookingStatsController,
  getTherapistUtilizationController,
  getRevenueMetricsController,
  getClientInsightsController
} from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/stats', getBookingStatsController);
router.get('/utilization/:therapistId', getTherapistUtilizationController);
router.get('/revenue', getRevenueMetricsController);
router.get('/insights', getClientInsightsController);

export default router;
