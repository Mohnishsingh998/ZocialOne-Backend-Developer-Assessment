import { isValidStatusTransition } from "../utils/complaintStatusFlow.js";
import { validateComplaintDetails } from "../utils/complaintValidators.js";
import { sendComplaintNotification } from "./Notification.service.js";
import Complaint from "../models/Complaint.model.js"
export async function createComplaint({
  user_id,
  complaint_type,
  details,
}) {
  validateComplaintDetails(complaint_type, details);

  let initialStatus = "raised";

  if (
    complaint_type === "live_demo" &&
    details.preferred_date &&
    details.preferred_time
  ) {
    initialStatus = "in_progress";
  }

  return Complaint.create({
    user_id,
    complaint_type,
    details,
    status: initialStatus,
  });
}

export async function updateComplaintStatus(complaintId, newStatus, userId) {
  const complaint = await Complaint.findOne({
    where: {
      id: complaintId,
      user_id: userId,
    },
  });

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  const oldStatus = complaint.status;

  if (!isValidStatusTransition(oldStatus, newStatus)) {
    throw new Error("Invalid status transition");
  }

  complaint.status = newStatus;
  await complaint.save();

  if (["in_progress", "resolved"].includes(newStatus)) {
    await sendComplaintNotification({
      user_id: complaint.user_id,
      complaint_id: complaint.id,
      status: newStatus,
    });
  }

  return complaint;
}
