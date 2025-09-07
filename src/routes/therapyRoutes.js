import express from "express";
import {
  startTherapyCall,
  latestSession,
  sessionMessages,
  saveSession,
  healthCheck
} from "../controllers/therapyController.js";

const router = express.Router();

router.post("/start-therapy-call", startTherapyCall);
router.get("/latest-session", latestSession);
router.get("/session-messages", sessionMessages);
router.post("/save-session", saveSession);
router.get("/health", healthCheck);

export default router;

