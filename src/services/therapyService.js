import axios from "axios";
import { analyzeSentiment } from "../utils/sentiment.js";

export async function makeTherapyCall(phoneNumber, name) {
  const payload = {
    assistantId: process.env.VAPI_ASSISTANT_ID,
    customer: { number: phoneNumber, name },
    phoneNumber: {
      twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
      twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
      twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER
    }
  };

  const response = await axios.post("https://api.vapi.ai/call/phone", payload, {
    headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}`, "Content-Type": "application/json" }
  });

  return response.data;
}

export async function getLatestTherapySession() {
  const response = await axios.get("https://api.vapi.ai/call", {
    headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
  });

  for (const call of response.data) {
    if (call.summary) {
      return {
        callId: call.id,
        summary: call.summary,
        duration: call.endedAt ? Math.round((new Date(call.endedAt) - new Date(call.createdAt)) / 1000 / 60) + " minutes" : "Ongoing",
        date: new Date(call.createdAt).toLocaleDateString("en-IN"),
        time: new Date(call.createdAt).toLocaleTimeString("en-IN")
      };
    }
  }
  return null;
}

export async function getUserTherapyMessages() {
  const response = await axios.get("https://api.vapi.ai/call", {
    headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
  });

  if (response.data && response.data.length > 0) {
    const latestCall = response.data[0];
    const userMessages = [];

    if (latestCall.messages) {
      latestCall.messages.forEach(msg => {
        if (msg.role === "user") {
          userMessages.push({
            messageNumber: userMessages.length + 1,
            timestamp: msg.timestamp || new Date().toISOString(),
            message: msg.message,
            sentiment: analyzeSentiment(msg.message)
          });
        }
      });
    }

    return {
      callId: latestCall.id,
      patientName: latestCall.customer?.name || "Unknown",
      totalMessages: userMessages.length,
      messages: userMessages
    };
  }
  return null;
}

export async function saveTherapySession() {
  const sessionData = await getUserTherapyMessages();
  if (!sessionData) return null;

  const therapySession = {
    sessionId: sessionData.callId,
    patientName: sessionData.patientName,
    date: new Date().toISOString(),
    totalMessages: sessionData.totalMessages,
    messages: sessionData.messages,
    overallSentiment: calculateOverallSentiment(sessionData.messages),
    savedAt: new Date().toISOString()
  };

  // Save to DB later if needed
  return therapySession;
}

function calculateOverallSentiment(messages) {
  if (!messages || messages.length === 0) return "neutral";
  const sentiments = messages.map(m => m.sentiment);
  const pos = sentiments.filter(s => s === "positive").length;
  const neg = sentiments.filter(s => s === "negative").length;
  if (pos > neg) return "mostly_positive";
  if (neg > pos) return "needs_attention";
  return "balanced";
}

