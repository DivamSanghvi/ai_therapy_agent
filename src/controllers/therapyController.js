import {
makeTherapyCall,
getLatestTherapySession,
getUserTherapyMessages,
saveTherapySession
} from "../services/therapyService.js";


export const startTherapyCall = async (req, res) => {
try {
const { phoneNumber, patientName } = req.body;
if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });


const result = await makeTherapyCall(phoneNumber, patientName || "Patient");
res.json({ success: true, message: "Call initiated", callData: result });
} catch (err) {
res.status(500).json({ success: false, error: err.message });
}
};


export const latestSession = async (req, res) => {
try {
const session = await getLatestTherapySession();
res.json(session || { message: "No sessions found" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};


export const sessionMessages = async (req, res) => {
try {
const messages = await getUserTherapyMessages();
res.json(messages || { message: "No messages found" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};


export const saveSession = async (req, res) => {
try {
const savedSession = await saveTherapySession();
res.json({ success: true, message: "Session saved", sessionData: savedSession });
} catch (err) {
res.status(500).json({ success: false, error: err.message });
}
};


export const healthCheck = (req, res) => {
res.json({ status: "AI Therapy Assistant is running!", timestamp: new Date().toISOString() });
};