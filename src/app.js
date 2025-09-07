import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import therapyRoutes from "./routes/therapyRoutes.js"
import therapistRoutes from "./routes/therapistRoutes.js"
import clientRoutes from "./routes/clientRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js"
import availabilityRoutes from "./routes/availabilityRoutes.js"
import systemSettingsRoutes from "./routes/systemSettingsRoutes.js"
import vapiToolsRoutes from "./routes/vapiToolsRoutes.js"
import bookingFlowRoutes from "./routes/bookingFlowRoutes.js"
import validationRoutes from "./routes/validationRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import analyticsRoutes from "./routes/analyticsRoutes.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes declaration
app.use("/", therapyRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/system-settings", systemSettingsRoutes);
app.use("/api/vapi-tools", vapiToolsRoutes);
app.use("/api/booking-flow", bookingFlowRoutes);
app.use("/api/validation", validationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);

// http://localhost:8000/api/v1/users/register

export { app }
