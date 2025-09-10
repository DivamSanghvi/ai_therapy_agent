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
  try {
    const { id, reason, cancelledBy } = req.body;
    const result = await cancelAppointmentTool(id, reason, cancelledBy);

    if (result.success) {
      res.json({
        message: "I've successfully cancelled your appointment. If you'd like to reschedule, I can help you find another time that works for you.",
        data: result
      });
    } else {
      res.json({
        message: "I'm sorry, I couldn't cancel the appointment. Please try again or contact support.",
        data: result
      });
    }
  } catch (err) {
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
    // Return hardcoded example response for testing
    const exampleResponse = {
      message: "Here's your appointment information: Date 2024-07-15, Time 10:00 to 11:00, Status: confirmed. Is there anything you'd like to change?",
      data: {
        "_id": "64b7f8a2e4b0c123456789ab",
        "therapist": {
          "_id": "64b7f7d1e4b0c123456789a9",
          "name": "Dr. Jane Smith",
          "specializations": ["anxiety", "depression"]
        },
        "client": {
          "_id": "64b7f7eae4b0c123456789aa",
          "name": "John Doe",
          "phone": "+1234567890"
        },
        "appointmentDate": "2024-07-15T00:00:00.000Z",
        "startTime": "10:00",
        "endTime": "11:00",
        "duration": 60,
        "status": "confirmed",
        "bookingSource": "web",
        "paymentStatus": "paid",
        "amount": 100,
        "currency": "USD",
        "sessionType": "follow_up",
        "sessionNotes": "Discussed progress",
        "therapistNotes": "Client showing improvement",
        "createdAt": "2024-06-30T12:00:00.000Z",
        "updatedAt": "2024-07-01T08:00:00.000Z"
      }
    };

    res.json(exampleResponse);
  } catch (err) {
    res.json({
      message: "I'm having trouble retrieving your appointment details right now. Can you try again?",
      error: true
    });
  }
};
