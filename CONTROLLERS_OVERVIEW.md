# Controller Structure Overview for Therapy Booking System

## 1. Therapist Controller
**Purpose:** Manage therapist profiles, schedules, and availability

**CRUD Operations:**
- `createTherapist()` - Onboard new therapists
- `getAllTherapists()` - List all therapists (with filters)
- `getTherapistById()` - Get specific therapist details
- `updateTherapist()` - Update profile, rates, schedule
- `deleteTherapist()` - Deactivate therapist
- `getAvailableTherapists()` - Find available therapists for specific date/time/specialization
- `updateWeeklySchedule()` - Modify recurring availability
- `addSpecialAvailability()` - Add date-specific availability overrides
- `getTherapistAppointments()` - Get all appointments for a therapist

## 2. Client Controller
**Purpose:** Manage client profiles and preferences

**CRUD Operations:**
- `createClient()` - Register new client (often from phone calls)
- `getClientByPhone()` - Find client by phone number (primary lookup for voice calls)
- `getClientById()` - Get client details
- `updateClient()` - Update preferences, contact info
- `getClientHistory()` - Get appointment history + AI session history
- `addAISessionHistory()` - Log AI therapy sessions
- `updateClientPreferences()` - Modify preferred therapists, time slots
- `searchClients()` - Admin search functionality

## 3. Appointment Controller
**Purpose:** Core booking system functionality

**CRUD Operations:**
- `createAppointment()` - Book new appointment
- `getAppointmentById()` - Get specific appointment
- `updateAppointmentStatus()` - Confirm, cancel, complete appointments
- `rescheduleAppointment()` - Move appointment to different time
- `cancelAppointment()` - Cancel with reason tracking
- `getAppointmentsByClient()` - Client's appointment history
- `getAppointmentsByTherapist()` - Therapist's schedule
- `getUpcomingAppointments()` - For reminder systems
- `checkAvailabilitySlot()` - Verify if specific slot is free
- `getAvailableSlots()` - Get all available slots for date range

## 4. Availability Controller
**Purpose:** Manage therapist availability overrides

**CRUD Operations:**
- `addAvailabilityOverride()` - Block dates or add custom schedules
- `removeAvailabilityOverride()` - Remove blocks
- `getTherapistAvailability()` - Calculate actual availability for date range
- `bulkUpdateAvailability()` - Handle vacation periods

## 5. System Settings Controller
**Purpose:** Manage app configuration

**CRUD Operations:**
- `getSetting()` - Get specific setting
- `updateSetting()` - Update configuration
- `getAllSettings()` - Get all settings by category

## 6. VAPI Tools Controller
**Purpose:** Handle tool calls from VAPI assistants

**Tool Operations:**
- `checkTherapistAvailability()` - Tool: Find available slots
- `bookAppointmentTool()` - Tool: Create booking
- `getClientInfoTool()` - Tool: Lookup returning client
- `cancelAppointmentTool()` - Tool: Handle cancellations
- `sendConfirmationTool()` - Tool: Send SMS confirmations
- `getAppointmentDetailsTool()` - Tool: Get booking details

## 7. Booking Flow Controller
**Purpose:** Orchestrate multi-step booking process

**Flow Operations:**
- `startBookingFlow()` - Initialize booking session
- `validateBookingData()` - Check all requirements met
- `processPayment()` - Handle payment integration
- `finalizeBooking()` - Complete booking + notifications
- `handleBookingError()` - Error recovery

## 8. Validation Controller
**Utility Functions:**
- `validatePhoneNumber()` - Format/validate Indian phone numbers
- `validateAppointmentSlot()` - Check time conflicts, business hours
- `validatePaymentData()` - Payment info validation
- `validateClientData()` - Required fields for booking

## 9. Notification Controller
**Purpose:** Handle SMS, email notifications

**Operations:**
- `sendAppointmentConfirmation()` - Book confirmation
- `sendReminder()` - 24h, 2h, 30min reminders
- `sendCancellationNotice()` - Cancellation notifications
- `sendRescheduleNotice()` - Rescheduling notifications

## 10. Analytics Controller
**Purpose:** Business insights and reporting

**Operations:**
- `getBookingStats()` - Daily/weekly/monthly booking metrics
- `getTherapistUtilization()` - How busy each therapist is
- `getRevenueMetrics()` - Payment and revenue tracking
- `getClientInsights()` - Client behavior patterns

## Priority Order for Development
**Phase 1 (Core CRUD):**
- Client Controller - Basic CRUD
- Therapist Controller - Basic CRUD + availability
- Appointment Controller - Core booking functions

**Phase 2 (VAPI Integration):**
- VAPI Tools Controller - Tool endpoints
- Booking Flow Controller - Orchestration
- Notification Controller - SMS confirmations

**Phase 3 (Advanced Features):**
- Availability Controller - Complex scheduling
- System Settings Controller - Configuration
- Analytics Controller - Insights

## Key Design Considerations
**Error Handling Strategy:**
- Consistent error response format
- VAPI-friendly error messages
- Fallback options for voice calls

**Data Relationships:**
- Efficient population of related data
- Optimized queries for common operations

**Business Rules Integration:**
- Payment validation before booking
- Cancellation policy enforcement
- Advance booking limits
