import cron from "node-cron";
import User from "../models/User.Model.js";
import { ONBOARDING_SCHEDULE } from "../utils/onboardingSchedule.js";
import { getOnboardingReminder } from "../utils/onboardingTemplates.js";
import { sendOnboardingReminder } from "../services/onboardingNotification.service.js";

export function startOnboardingReminderCron() {
  cron.schedule("*/10 * * * *", async () => {
    const users = await User.findAll();

    const now = new Date();

    for (const user of users) {
      const stage = user.onboarding_stage;
      const stageStart = new Date(user.onboarding_stage_updated_at);
      const elapsedHours =
        (now - stageStart) / (1000 * 60 * 60);

      const schedule = ONBOARDING_SCHEDULE[stage] || [];
      const sent = user.onboarding_reminders_sent[stage] || [];

      for (const hours of schedule) {
        if (elapsedHours >= hours && !sent.includes(hours)) {
          const content = getOnboardingReminder(stage, hours);
          if (!content) continue;

          sendOnboardingReminder({
            user_id: user.id,
            title: content.title,
            body: content.body,
          });

          user.onboarding_reminders_sent[stage] = [
            ...(user.onboarding_reminders_sent[stage] || []),
            hours,
          ];

          await user.save();
        }
      }
    }
  });
}
