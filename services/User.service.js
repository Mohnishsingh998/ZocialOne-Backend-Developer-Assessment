import User from "../models/User.Model.js";
import Complaint from "../models/Complaint.model.js";

export async function getUserDetails(userId) {
  const user = await User.findByPk(userId, {
    attributes: [
      "id",
      "name",
      "email",
      "created_at",
      "onboarding_stage",
    ],
  });

  if (!user) {
    throw new Error("User not found");
  }

  const complaints_count = await Complaint.count({
    where: { user_id: userId },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    onboarding_stage: user.onboarding_stage,
    complaints_count,
    onboarding_complete: user.onboarding_stage === 2,
  };
}
