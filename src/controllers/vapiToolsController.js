import { getClientByPhone } from '../services/clientService.js';
import { getAppointmentsByClient } from '../services/appointmentService.js';
import {
  checkTherapistAvailability,
  bookAppointmentTool,
  getClientInfoTool,
  cancelAppointmentTool,
  sendConfirmationTool,
  getAppointmentDetailsTool
} from '../services/vapiToolsService.js';

export const checkTherapistAvailabilityController = async (req, res) => {
  try {
    const { date, startTime, endTime, specialization } = req.body;
    const result = await checkTherapistAvailability(date, startTime, endTime, specialization);

    if (result.availableTherapists.length > 0) {
      const therapistList = result.availableTherapists
        .map(t => t.name)
        .join(', ');

      res.json({
        message: `I found ${result.availableTherapists.length} available therapist${result.availableTherapists.length > 1 ? 's' : ''} for ${date}: ${therapistList}. Which one would you like to book with?`,
        data: result.availableTherapists
      });
    } else {
      res.json({
        message: "I'm sorry, no therapists are available for that time. Would you like to try a different day or time?",
        data: []
      });
    }
  } catch (err) {
    res.json({
      message: "I'm having trouble checking availability right now. Can you try again?",
      error: true
    });
  }
};

export const bookAppointmentToolController = async (req, res) => {
  try {
    console.log('=== bookAppointmentToolController START ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const { clientPhone, therapistId, appointmentDate, startTime, endTime, duration, amount } = req.body;
    console.log('Extracted fields:', { clientPhone, therapistId, appointmentDate, startTime, endTime, duration, amount });

    if (!clientPhone || !therapistId || !appointmentDate || !startTime || !endTime || !duration || !amount) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ error: 'clientPhone, therapistId, appointmentDate, startTime, endTime, duration, and amount are required' });
    }

    const data = req.body;
    console.log('Calling bookAppointmentTool with data:', JSON.stringify(data, null, 2));

    const result = await bookAppointmentTool(data);
    console.log('bookAppointmentTool result:', JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('Booking successful, sending success response');
      res.json({
        message: `Great! I've successfully booked your appointment for ${appointmentDate} at ${startTime}. Your appointment ID is ${result.appointmentId}. You'll receive a confirmation shortly.`,
        data: result
      });
    } else {
      console.log('Booking failed, sending failure response');
      res.json({
        message: "I'm sorry, I couldn't book the appointment. Please try again or contact support.",
        data: result
      });
    }
  } catch (err) {
    console.error('=== bookAppointmentToolController ERROR ===');
    console.error('Error type:', typeof err);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    console.error('Error details:', err);

    res.json({
      message: "I encountered an error while booking your appointment. Please try again.",
      error: err.message || err.toString()
    });
  }
};

export const getClientInfoToolController = async (req, res) => {
  try {
    const { phone } = req.body;
    const result = await getClientInfoTool(phone);

    if (result.clientInfo) {
      res.json({
        message: `I found your information: ${result.clientInfo.name}, phone number ${result.clientInfo.phone}. How can I help you with your appointment today?`,
        data: result.clientInfo
      });
    } else {
      res.json({
        message: "I don't have your information on file. Would you like me to create a new profile for you?",
        data: null
      });
    }
  } catch (err) {
    res.json({
      message: "I'm having trouble retrieving your information right now. Can you try again?",
      error: true
    });
  }
};

export const cancelAppointmentToolController = async (req, res) => {
  console.log('=== cancelAppointmentToolController START ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    const { id, phone, reason, cancelledBy } = req.body;
    console.log('Extracted fields:', { id, phone, reason, cancelledBy });

    if (id) {
      console.log('=== Cancel by appointment ID ===');
      console.log('Calling cancelAppointmentTool with id:', id, 'reason:', reason, 'cancelledBy:', cancelledBy);

      // Cancel by appointment ID
      const result = await cancelAppointmentTool(id, reason, cancelledBy);
      console.log('cancelAppointmentTool result:', JSON.stringify(result, null, 2));

      if (result.success) {
        console.log('Cancellation successful, sending success response');
        res.json({
          message: "I've successfully cancelled your appointment. If you'd like to reschedule, I can help you find another time that works for you.",
          data: result
        });
      } else {
        console.log('Cancellation failed, sending failure response');
        res.json({
          message: "I'm sorry, I couldn't cancel the appointment. Please try again or contact support.",
          data: result
        });
      }
    } else if (phone) {
      console.log('=== Cancel by phone number ===');
      console.log('Phone provided:', phone);

      // Cancel by phone number - find client and their upcoming appointments
      console.log('Calling getClientByPhone with phone:', phone);
      const client = await getClientByPhone(phone);
      console.log('getClientByPhone result:', client ? 'Client found' : 'Client not found');

      if (!client) {
        console.log('No client found, returning error response');
        return res.json({
          message: "I couldn't find any client with that phone number. Would you like to create a new profile?",
          data: null
        });
      }

      // Get all upcoming appointments for this client
      console.log('Calling getAppointmentsByClient with client._id:', client._id);
      const appointments = await getAppointmentsByClient(client._id);
      console.log('getAppointmentsByClient result: Found', appointments ? appointments.length : 0, 'appointments');

      const upcomingAppointments = appointments.filter(app =>
        app.status === 'confirmed' || app.status === 'pending'
      );
      console.log('Upcoming appointments after filtering:', upcomingAppointments.length);

      if (!upcomingAppointments || upcomingAppointments.length === 0) {
        console.log('No upcoming appointments, returning response');
        return res.json({
          message: "You don't have any upcoming appointments to cancel.",
          data: []
        });
      }

      // If multiple appointments, cancel the next upcoming one
      // Sort by date and time to get the soonest appointment
      console.log('Sorting upcoming appointments by date/time');
      const sortedAppointments = upcomingAppointments.sort((a, b) => {
        const dateA = new Date(`${a.appointmentDate.split('T')[0]}T${a.startTime}`);
        const dateB = new Date(`${b.appointmentDate.split('T')[0]}T${b.startTime}`);
        return dateA - dateB;
      });

      const appointmentToCancel = sortedAppointments[0];
      console.log('Appointment to cancel:', appointmentToCancel._id, 'on', appointmentToCancel.appointmentDate, 'at', appointmentToCancel.startTime);

      const cancelReason = reason || 'Cancelled by client via phone';
      const cancelBy = cancelledBy || 'client';
      console.log('Calling cancelAppointmentTool with id:', appointmentToCancel._id, 'reason:', cancelReason, 'cancelledBy:', cancelBy);

      const result = await cancelAppointmentTool(appointmentToCancel._id, cancelReason, cancelBy);
      console.log('cancelAppointmentTool result:', JSON.stringify(result, null, 2));

      if (result.success) {
        console.log('Cancellation successful, sending success response');
        res.json({
          message: `I've successfully cancelled your upcoming appointment for ${appointmentToCancel.appointmentDate} at ${appointmentToCancel.startTime}. If you'd like to reschedule, I can help you find another time that works for you.`,
          data: {
            cancelledAppointment: appointmentToCancel,
            ...result
          }
        });
      } else {
        console.log('Cancellation failed, sending failure response');
        res.json({
          message: "I'm sorry, I couldn't cancel the appointment. Please try again or contact support.",
          data: result
        });
      }
    } else {
      console.log('=== No id or phone provided ===');
      res.json({
        message: "Please provide either an appointment ID or your phone number to cancel an appointment.",
        data: null
      });
    }
  } catch (err) {
    console.error('=== cancelAppointmentToolController ERROR ===');
    console.error('Error type:', typeof err);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    console.error('Error details:', err);

    res.json({
      message: "I encountered an error while cancelling your appointment. Please try again.",
      error: err.message
    });
  }
};

export const sendConfirmationToolController = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const result = await sendConfirmationTool(appointmentId);

    if (result.success) {
      res.json({
        message: "I've sent you a confirmation message with all the appointment details. Please check your phone for the SMS.",
        data: result
      });
    } else {
      res.json({
        message: "I'm having trouble sending the confirmation right now, but your appointment is still booked. You should receive it shortly.",
        data: result
      });
    }
  } catch (err) {
    res.json({
      message: "I encountered an error while sending the confirmation. Your appointment is still booked though.",
      error: err.message
    });
  }
};

export const getAppointmentDetailsToolController = async (req, res) => {
  try {
    const { id, phone } = req.body;

    if (id) {
      const result = await getAppointmentDetailsTool(id);

      if (result.appointmentDetails) {
        const appointment = result.appointmentDetails;
        res.json({
          message: `Here's your appointment information: Date ${appointment.appointmentDate}, Time ${appointment.startTime} to ${appointment.endTime}, Status: ${appointment.status}. Is there anything you'd like to change?`,
          data: result.appointmentDetails
        });
      } else {
        res.json({
          message: "I couldn't find that appointment. Could you please provide the appointment ID again?",
          data: null
        });
      }
    } else if (phone) {
      // Retrieve all appointments for client by phone number
      const client = await getClientByPhone(phone);
      if (!client) {
        return res.json({
          message: "I couldn't find any client with that phone number. Would you like to create a new profile?",
          data: null
        });
      }
      const appointments = await getAppointmentsByClient(client._id);
      if (!appointments || appointments.length === 0) {
        return res.json({
          message: "You have no scheduled appointments.",
          data: []
        });
      }
      // Format appointment summaries
      const summaries = appointments.map(app => {
        return `Appointment on ${app.appointmentDate} from ${app.startTime} to ${app.endTime}, status: ${app.status}`;
      }).join('; ');
      res.json({
        message: `Here are your scheduled appointments: ${summaries}.`,
        data: appointments
      });
    } else {
      res.json({
        message: "Please provide either an appointment ID or your phone number to retrieve appointment details.",
        data: null
      });
    }
  } catch (err) {
    res.json({
      message: "I'm having trouble retrieving your appointment details right now. Can you try again?",
      error: true
    });
  }
};
