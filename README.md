# Therapy Booking System

A modern backend API for managing therapy appointments with voice-based booking integration via VAPI.

## 🚀 Features

- **Voice-Enabled Booking**: Seamless appointment booking through VAPI voice assistants
- **Therapist Management**: Complete CRUD operations for therapist profiles and schedules
- **Client Management**: Client profiles with preferences and therapy history
- **Smart Scheduling**: Availability checking, conflict prevention, and automated slot management
- **Appointment Lifecycle**: Book, reschedule, cancel, and track appointments
- **Real-time Notifications**: SMS/email confirmations and reminders
- **Analytics Dashboard**: Booking statistics and therapist utilization metrics

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Voice Integration**: VAPI API
- **Validation**: Custom business logic validation
- **Architecture**: MVC pattern with service layer

## 📦 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB
- VAPI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd therapy-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env` file:
   ```env
   PORT=8001
   MONGODB_URI=mongodb://localhost:27017/therapy-booking
   VAPI_API_KEY=your-vapi-api-key
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:8001`

## 📖 API Usage

### Base URL
```
http://localhost:8001/api
```

### Key Endpoints

#### Therapists
```http
GET    /therapists           # List all therapists
POST   /therapists           # Create therapist
GET    /therapists/:id       # Get therapist details
PUT    /therapists/:id       # Update therapist
DELETE /therapists/:id       # Delete therapist
```

#### Appointments
```http
GET    /appointments                    # List appointments
POST   /appointments                    # Create appointment
GET    /appointments/:id                # Get appointment
PUT    /appointments/:id/cancel         # Cancel appointment
PUT    /appointments/:id/reschedule     # Reschedule appointment
```

#### VAPI Tools (Voice Integration)
```http
POST   /vapi-tools/check-availability   # Check therapist availability
POST   /vapi-tools/book-appointment     # Voice booking
POST   /vapi-tools/cancel-appointment   # Voice cancellation
POST   /vapi-tools/appointment-details  # Get appointment info
```

### Example Request

```bash
curl -X POST http://localhost:8001/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "therapist": "therapist_id",
    "client": "client_id",
    "appointmentDate": "2024-01-15",
    "startTime": "10:00",
    "endTime": "11:00",
    "amount": 100
  }'
```

## 🏗 Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── models/          # Database schemas
├── db/              # Database connection
└── utils/           # Helper functions
```

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

### Environment Variables
- `PORT`: Server port (default: 8001)
- `MONGODB_URI`: MongoDB connection string
- `VAPI_API_KEY`: VAPI API key for voice features

## 📊 API Documentation

For detailed API documentation, see the [API Reference](./API_REFERENCE.md) or use tools like Postman to explore endpoints interactively.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
