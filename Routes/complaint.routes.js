import express from "express";
import {
  create,
  updateStatus,
  metrics,
} from "../Controller/Complaint.controller.js";
import authMiddleware from "../Middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/complaints",authMiddleware, create);
router.patch("/complaints/:id/status",authMiddleware, updateStatus);
router.get("/complaints/:id/metrics",authMiddleware, metrics);

export default router;
