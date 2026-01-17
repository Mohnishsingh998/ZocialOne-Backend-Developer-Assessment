import Notification from "../models/Notification.model.js";

export async function sendComplaintNotification({
  user_id,
  complaint_id,
  status,
}) {
  let title;
  let body;

  if (status === "in_progress") {
    title = "Your complaint is in progress";
    body = `Complaint #${complaint_id} is currently being worked on.`;
  }

  if (status === "resolved") {
    title = "Your complaint has been resolved";
    body = `Complaint #${complaint_id} has been resolved. Please review.`;
  }

  if (!title) return;

  const notification = await Notification.create({
    user_id,
    title,
    body,
    is_sent: true,
  });

  console.log("Notification Sent:", {
    id: notification.id,
    user_id,
    title,
    body,
  });

  return notification;
}
