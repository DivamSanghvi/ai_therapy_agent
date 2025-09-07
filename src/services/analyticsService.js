import Appointment from '../models/appointment.js';
import Therapist from '../models/therapist.js';
import Client from '../models/client.js';

export const getBookingStats = async (startDate, endDate) => {
  const stats = await Appointment.aggregate([
    { $match: { appointmentDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
    { $group: { _id: null, total: { $sum: 1 }, confirmed: { $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] } } } }
  ]);
  return stats[0] || { total: 0, confirmed: 0 };
};

export const getTherapistUtilization = async (therapistId, startDate, endDate) => {
  const appointments = await Appointment.find({
    therapist: therapistId,
    appointmentDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
  });
  const totalHours = appointments.reduce((sum, app) => sum + app.duration, 0);
  return { totalAppointments: appointments.length, totalHours };
};

export const getRevenueMetrics = async (startDate, endDate) => {
  const revenue = await Appointment.aggregate([
    { $match: { appointmentDate: { $gte: new Date(startDate), $lte: new Date(endDate) }, status: 'completed' } },
    { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
  ]);
  return revenue[0] || { totalRevenue: 0 };
};

export const getClientInsights = async () => {
  const insights = await Client.aggregate([
    { $lookup: { from: 'appointments', localField: '_id', foreignField: 'client', as: 'appointments' } },
    { $project: { name: 1, phone: 1, appointmentCount: { $size: '$appointments' } } },
    { $sort: { appointmentCount: -1 } },
    { $limit: 10 }
  ]);
  return insights;
};
