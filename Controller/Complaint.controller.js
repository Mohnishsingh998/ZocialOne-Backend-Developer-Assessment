import {
  createComplaint,
  updateComplaintStatus,
} from "../services/Complaint.service.js";
import { getComplaintMetrics } from "../services/ComplaintMetrics.service.js";

export async function create(req, res) {
  try {
    const complaint = await createComplaint({
      user_id: req.user?.id || req.body.user_id,
      complaint_type: req.body.complaint_type,
      details: req.body.details,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await updateComplaintStatus(
      req.params.id,
      req.body.status,
      req.user.id,
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function metrics(req, res) {
  try {
    const { id } = req.params;

    const metrics = await getComplaintMetrics(id, req.user.id);

    res.status(200).json(metrics);
  } catch (error) {
    const code = error.message === "Complaint not found" ? 404 : 500;
    res.status(code).json({ error: error.message });
  }
}
