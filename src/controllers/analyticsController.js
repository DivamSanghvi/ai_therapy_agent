import {
  getBookingStats,
  getTherapistUtilization,
  getRevenueMetrics,
  getClientInsights
} from '../services/analyticsService.js';

export const getBookingStatsController = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const stats = await getBookingStats(startDate, endDate);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTherapistUtilizationController = async (req, res) => {
  try {
    const { therapistId, startDate, endDate } = req.query;
    const utilization = await getTherapistUtilization(therapistId, startDate, endDate);
    res.json(utilization);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRevenueMetricsController = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const metrics = await getRevenueMetrics(startDate, endDate);
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClientInsightsController = async (req, res) => {
  try {
    const insights = await getClientInsights();
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
