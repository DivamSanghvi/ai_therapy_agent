# Therapy Booking System

A comprehensive backend system for managing therapy appointments, built with Node.js, Express, and MongoDB. This system integrates with VAPI for voice-based booking and provides full CRUD operations for therapists, clients, appointments, and more.

## Features

- **Therapist Management**: Create, read, update, delete therapists with specializations, schedules, and availability
- **Client Management**: Manage client profiles, preferences, and therapy history
- **Appointment Booking**: Schedule, reschedule, cancel appointments with availability checking
- **VAPI Integration**: Voice-based booking tools for seamless user experience
- **Availability Management**: Handle therapist availability, overrides, and bulk updates
- **System Settings**: Configurable system-wide settings
- **Booking Flow**: Multi-step booking process with validation and payment processing
- **Validation**: Phone number, appointment slot, payment, and client data validation
- **Notifications**: Send confirmations, reminders, cancellations, and reschedule notices
- **Analytics**: Booking statistics, therapist utilization, revenue metrics, and client insights

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (assumed for future implementation)
- **Validation**: Custom validation services
- **Notifications**: Mock notification service (can be integrated with email/SMS providers)
- **VAPI**: Voice API integration for booking

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd therapy-booking-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=8001
   MONGODB_URI=mongodb://localhost:27017/therapy-booking
   CORS_ORIGIN=http://localhost:3000
   JWT_SECRET=your-jwt-secret
   VAPI_API_KEY=your-vapi-api-key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:8001`

## Usage

The API provides RESTful endpoints for all operations. Use tools like Postman or curl to interact with the endpoints.

## API Documentation

All endpoints are prefixed with `/api/`. Below is a comprehensive list of all available endpoints with request examples.

### Therapist Endpoints

#### Get All Therapists
- **Method**: GET
- **Path**: `/api/therapists`
- **Response**: Array of therapist objects

#### Get Therapist by ID
- **Method**: GET
- **Path**: `/api/therapists/:id`
- **Response**: Therapist object

#### Create Therapist
- **Method**: POST
- **Path**: `/api/therapists`
- **Request Body**:
  ```json
  {
    "name": "Dr. John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "specializations": ["anxiety", "depression"],
    "qualifications": ["PhD in Psychology"],
    "experience": 10,
    "bio": "Experienced therapist specializing in anxiety and depression",
    "hourlyRate": 100,
    "currency": "USD",
    "weeklySchedule": {
      "monday": { "available": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
      "tuesday": { "available": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
      "wednesday": { "available": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
      "thursday": { "available": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
      "friday": { "available": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
      "saturday": { "available": false, "slots": [] },
      "sunday": { "available": false, "slots": [] }
    },
    "sessionDuration": 60,
    "bufferTime": 15,
    "advanceBookingDays": 30
  }
  ```

#### Update Therapist
- **Method**: PUT
- **Path**: `/api/therapists/:id`
- **Request Body**: Same as create, partial updates allowed

#### Delete Therapist
- **Method**: DELETE
- **Path**: `/api/therapists/:id`

#### Get Available Therapists
- **Method**: GET
- **Path**: `/api/therapists/available`
- **Query Params**: date, specialization

#### Update Weekly Schedule
- **Method**: PUT
- **Path**: `/api/therapists/:id/schedule`
- **Request Body**: Updated weeklySchedule object

#### Add Special Availability
- **Method**: POST
- **Path**: `/api/therapists/:id/availability`
- **Request Body**:
  ```json
  {
    "date": "2024-01-15",
    "type": "custom_schedule",
    "customSlots": [{ "start": "10:00", "end": "12:00", "available": true }],
    "reason": "Special availability"
  }
  ```

#### Get Therapist Appointments
- **Method**: GET
- **Path**: `/api/therapists/:id/appointments`

### Client Endpoints

#### Get All Clients
- **Method**: GET
- **Path**: `/api/clients`

#### Get Client by Phone
- **Method**: GET
- **Path**: `/api/clients/phone/:phone`

#### Get Client by ID
- **Method**: GET
- **Path**: `/api/clients/:id`

#### Create Client
- **Method**: POST
- **Path**: `/api/clients`
- **Request Body**:
  ```json
  {
    "name": "Jane Smith",
    "phone": "+1987654321",
    "email": "jane.smith@example.com",
    "age": 30,
    "gender": "female",
    "preferredTherapists": ["therapist_id_1"],
    "preferredSpecializations": ["anxiety"],
    "preferredLanguage": "english",
    "preferredTimeSlots": [{ "day": "monday", "startTime": "10:00", "endTime": "12:00" }],
    "emergencyContact": { "name": "John Smith", "phone": "+1123456789", "relationship": "spouse" }
  }
  ```

#### Update Client
- **Method**: PUT
- **Path**: `/api/clients/:id`
- **Request Body**: Same as create, partial updates allowed

#### Get Client History
- **Method**: GET
- **Path**: `/api/clients/:id/history`

#### Add AI Session History
- **Method**: POST
- **Path**: `/api/clients/:id/ai-session`
- **Request Body**:
  ```json
  {
    "sessionId": "session_123",
    "date": "2024-01-10T10:00:00Z",
    "duration": 60,
    "summary": "Discussed anxiety management techniques",
    "sentiment": "positive"
  }
  ```

#### Update Client Preferences
- **Method**: PUT
- **Path**: `/api/clients/:id/preferences`
- **Request Body**: Updated preferences object

#### Search Clients
- **Method**: GET
- **Path**: `/api/clients/search`
- **Query Params**: name, phone, email

### Appointment Endpoints

#### Get All Appointments
- **Method**: GET
- **Path**: `/api/appointments`

#### Get Appointment by ID
- **Method**: GET
- **Path**: `/api/appointments/:id`

#### Create Appointment
- **Method**: POST
- **Path**: `/api/appointments`
- **Request Body**:
  ```json
  {
    "therapist": "therapist_id",
    "client": "client_id",
    "appointmentDate": "2024-01-15",
    "startTime": "10:00",
    "endTime": "11:00",
    "duration": 60,
    "amount": 100,
    "currency": "USD",
    "sessionType": "follow_up",
    "bookingSource": "web"
  }
  ```

#### Update Appointment Status
- **Method**: PUT
- **Path**: `/api/appointments/:id/status`
- **Request Body**:
  ```json
  {
    "status": "confirmed"
  }
  ```

#### Reschedule Appointment
- **Method**: PUT
- **Path**: `/api/appointments/:id/reschedule`
- **Request Body**:
  ```json
  {
    "appointmentDate": "2024-01-16",
    "startTime": "11:00",
    "endTime": "12:00"
  }
  ```

#### Cancel Appointment
- **Method**: PUT
- **Path**: `/api/appointments/:id/cancel`
- **Request Body**:
  ```json
  {
    "reason": "Client request"
  }
  ```

#### Get Appointments by Client
- **Method**: GET
- **Path**: `/api/appointments/client/:clientId`

#### Get Appointments by Therapist
- **Method**: GET
- **Path**: `/api/appointments/therapist/:therapistId`

#### Get Upcoming Appointments
- **Method**: GET
- **Path**: `/api/appointments/upcoming`

#### Check Availability Slot
- **Method**: POST
- **Path**: `/api/appointments/check-slot`
- **Request Body**:
  ```json
  {
    "therapist": "therapist_id",
    "date": "2024-01-15",
    "startTime": "10:00",
    "endTime": "11:00"
  }
  ```

#### Get Available Slots
- **Method**: GET
- **Path**: `/api/appointments/available-slots`
- **Query Params**: therapist, date

### Availability Endpoints

#### Add Availability Override
- **Method**: POST
- **Path**: `/api/availability/override`
- **Request Body**:
  ```json
  {
    "therapist": "therapist_id",
    "date": "2024-01-15",
    "type": "unavailable",
    "reason": "Vacation"
  }
  ```

#### Remove Availability Override
- **Method**: DELETE
- **Path**: `/api/availability/override/:id`

#### Get Therapist Availability
- **Method**: GET
- **Path**: `/api/availability/therapist/:therapistId`
- **Query Params**: date

#### Bulk Update Availability
- **Method**: PUT
- **Path**: `/api/availability/bulk`
- **Request Body**: Array of availability updates

### System Settings Endpoints

#### Get Setting
- **Method**: GET
- **Path**: `/api/system-settings/:key`

#### Update Setting
- **Method**: PUT
- **Path**: `/api/system-settings/:key`
- **Request Body**:
  ```json
  {
    "settingValue": "new_value"
  }
  ```

#### Get All Settings
- **Method**: GET
- **Path**: `/api/system-settings`

### VAPI Tools Endpoints

#### Check Therapist Availability
- **Method**: POST
- **Path**: `/api/vapi-tools/check-availability`
- **Request Body**:
  ```json
  {
    "therapistId": "therapist_id",
    "date": "2024-01-15"
  }
  ```

#### Book Appointment Tool
- **Method**: POST
- **Path**: `/api/vapi-tools/book-appointment`
- **Request Body**:
  ```json
  {
    "clientPhone": "+1234567890",
    "therapistId": "therapist_id",
    "date": "2024-01-15",
    "startTime": "10:00"
  }
  ```

#### Get Client Info Tool
- **Method**: POST
- **Path**: `/api/vapi-tools/client-info`
- **Request Body**:
  ```json
  {
    "phone": "+1234567890"
  }
  ```

#### Cancel Appointment Tool
- **Method**: POST
- **Path**: `/api/vapi-tools/cancel-appointment`
- **Request Body**:
  ```json
  {
    "appointmentId": "appointment_id"
  }
  ```

#### Send Confirmation Tool
- **Method**: POST
- **Path**: `/api/vapi-tools/send-confirmation`
- **Request Body**:
  ```json
  {
    "appointmentId": "appointment_id"
  }
  ```

#### Get Appointment Details Tool
- **Method**: POST
- **Path**: `/api/vapi-tools/appointment-details`
- **Request Body**:
  ```json
  {
    "appointmentId": "appointment_id"
  }
  ```

### Booking Flow Endpoints

#### Start Booking Flow
- **Method**: POST
- **Path**: `/api/booking-flow/start`
- **Request Body**:
  ```json
  {
    "clientPhone": "+1234567890"
  }
  ```

#### Validate Booking Data
- **Method**: POST
- **Path**: `/api/booking-flow/validate`
- **Request Body**:
  ```json
  {
    "therapist": "therapist_id",
    "date": "2024-01-15",
    "startTime": "10:00"
  }
  ```

#### Process Payment
- **Method**: POST
- **Path**: `/api/booking-flow/payment`
- **Request Body**:
  ```json
  {
    "amount": 100,
    "currency": "USD",
    "paymentMethod": "card"
  }
  ```

#### Finalize Booking
- **Method**: POST
- **Path**: `/api/booking-flow/finalize`
- **Request Body**:
  ```json
  {
    "bookingId": "booking_id"
  }
  ```

#### Handle Booking Error
- **Method**: POST
- **Path**: `/api/booking-flow/error`
- **Request Body**:
  ```json
  {
    "bookingId": "booking_id",
    "error": "Payment failed"
  }
  ```

### Validation Endpoints

#### Validate Phone Number
- **Method**: POST
- **Path**: `/api/validation/phone`
- **Request Body**:
  ```json
  {
    "phone": "+1234567890"
  }
  ```

#### Validate Appointment Slot
- **Method**: POST
- **Path**: `/api/validation/slot`
- **Request Body**:
  ```json
  {
    "therapist": "therapist_id",
    "date": "2024-01-15",
    "startTime": "10:00",
    "endTime": "11:00"
  }
  ```

#### Validate Payment Data
- **Method**: POST
- **Path**: `/api/validation/payment`
- **Request Body**:
  ```json
  {
    "amount": 100,
    "currency": "USD",
    "method": "card"
  }
  ```

#### Validate Client Data
- **Method**: POST
- **Path**: `/api/validation/client`
- **Request Body**:
  ```json
  {
    "name": "Jane Smith",
    "phone": "+1234567890",
    "email": "jane.smith@example.com"
  }
  ```

### Notification Endpoints

#### Send Appointment Confirmation
- **Method**: POST
- **Path**: `/api/notifications/confirmation`
- **Request Body**:
  ```json
  {
    "appointmentId": "appointment_id"
  }
  ```

#### Send Reminder
- **Method**: POST
- **Path**: `/api/notifications/reminder`
- **Request Body**:
  ```json
  {
    "appointmentId": "appointment_id",
    "reminderType": "24h"
  }
  ```

#### Send Cancellation Notice
- **Method**: POST
- **Path**: `/api/notifications/cancellation`
- **Request Body**:
  ```json
  {
    "appointmentId": "appointment_id"
  }
  ```

#### Send Reschedule Notice
- **Method**: POST
- **Path**: `/api/notifications/reschedule`
- **Request Body**:
  ```json
  {
    "appointmentId": "appointment_id",
    "newDate": "2024-01-16",
    "newTime": "11:00"
  }
  ```

### Analytics Endpoints

#### Get Booking Stats
- **Method**: GET
- **Path**: `/api/analytics/stats`
- **Query Params**: startDate, endDate

#### Get Therapist Utilization
- **Method**: GET
- **Path**: `/api/analytics/utilization/:therapistId`
- **Query Params**: startDate, endDate

#### Get Revenue Metrics
- **Method**: GET
- **Path**: `/api/analytics/revenue`
- **Query Params**: startDate, endDate

#### Get Client Insights
- **Method**: GET
- **Path**: `/api/analytics/insights`
- **Query Params**: startDate, endDate

## Data Models

### Therapist
- therapistId: String (unique)
- name: String
- email: String (unique)
- phone: String (unique)
- specializations: Array of Strings
- qualifications: Array of Strings
- experience: Number
- bio: String
- hourlyRate: Number
- currency: String
- weeklySchedule: Object with days and slots
- sessionDuration: Number
- bufferTime: Number
- advanceBookingDays: Number
- isActive: Boolean
- isVerified: Boolean
- createdAt: Date
- updatedAt: Date

### Client
- clientId: String (unique)
- name: String
- phone: String (unique)
- email: String
- age: Number
- gender: String
- preferredTherapists: Array of ObjectIds
- preferredSpecializations: Array of Strings
- preferredLanguage: String
- preferredTimeSlots: Array of Objects
- emergencyContact: Object
- isActive: Boolean
- consentGiven: Boolean
- aiTherapySessions: Array of Objects
- notes: Array of Strings
- createdAt: Date
- updatedAt: Date

### Appointment
- appointmentId: String (unique)
- therapist: ObjectId (ref: Therapist)
- client: ObjectId (ref: Client)
- appointmentDate: Date
- startTime: String
- endTime: String
- duration: Number
- status: String (enum)
- bookingSource: String
- bookingDate: Date
- paymentStatus: String
- amount: Number
- currency: String
- paymentMethod: String
- transactionId: String
- sessionType: String
- sessionNotes: String
- therapistNotes: String
- cancellationReason: String
- cancelledBy: String
- cancelledAt: Date
- originalAppointmentId: String
- remindersSent: Object
- vapiCallId: String
- createdAt: Date
- updatedAt: Date

### Availability
- therapist: ObjectId (ref: Therapist)
- date: Date
- type: String (enum)
- customSlots: Array of Objects
- reason: String
- createdAt: Date

### SystemSettings
- settingKey: String (unique)
- settingValue: Mixed
- description: String
- category: String
- updatedAt: Date

## Project Structure

```
src/
├── app.js                 # Main Express app with route registration
├── index.js               # Server startup and DB connection
├── controllers/           # Express controllers
│   ├── therapistController.js
│   ├── clientController.js
│   ├── appointmentController.js
│   ├── availabilityController.js
│   ├── systemSettingsController.js
│   ├── vapiToolsController.js
│   ├── bookingFlowController.js
│   ├── validationController.js
│   ├── notificationController.js
│   └── analyticsController.js
├── services/              # Business logic services
│   ├── therapistService.js
│   ├── clientService.js
│   ├── appointmentService.js
│   ├── availabilityService.js
│   ├── systemSettingsService.js
│   ├── vapiToolsService.js
│   ├── bookingFlowService.js
│   ├── validationService.js
│   ├── notificationService.js
│   └── analyticsService.js
├── routes/                # Express routes
│   ├── therapistRoutes.js
│   ├── clientRoutes.js
│   ├── appointmentRoutes.js
│   ├── availabilityRoutes.js
│   ├── systemSettingsRoutes.js
│   ├── vapiToolsRoutes.js
│   ├── bookingFlowRoutes.js
│   ├── validationRoutes.js
│   ├── notificationRoutes.js
│   └── analyticsRoutes.js
├── models/                # Mongoose schemas
│   ├── therapist.js
│   ├── client.js
│   ├── appointment.js
│   ├── availability.js
│   └── systemSettings.js
├── db/
│   └── index.js           # Database connection
├── constants.js           # Application constants
└── utils/                 # Utility functions
    └── sentiment.js       # Sentiment analysis utility
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
