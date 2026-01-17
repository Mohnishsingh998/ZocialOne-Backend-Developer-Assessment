import User from "../models/User.Model.js";

export async function updateOnboardingStage(userId, newStage) {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.onboarding_stage === newStage) {
    return user;
  }

  user.onboarding_stage = newStage;
  user.onboarding_stage_updated_at = new Date();
  user.onboarding_reminders_sent = {};

  await user.save();

  return user;
}
