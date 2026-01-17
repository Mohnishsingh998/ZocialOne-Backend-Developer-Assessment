import Complaint from "../models/Complaint.model.js";

export async function getComplaintMetrics(complaintId, userId) {
  const complaint = await Complaint.findOne({
    where: {
      id: complaintId,
      user_id: userId,
    },
    attributes: [
      "id",
      "status",
      "created_at",
      "status_updated_at",
    ],
  });

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  const now = new Date();

  const totalTimeMs = now - complaint.created_at;
  const currentStatusTimeMs = now - complaint.status_updated_at;

  return {
    complaint_id: complaint.id,
    current_status: complaint.status,
    time_in_current_status_minutes: Math.floor(
      currentStatusTimeMs / (1000 * 60)
    ),
    total_time_minutes: Math.floor(
      totalTimeMs / (1000 * 60)
    ),
  };
}

