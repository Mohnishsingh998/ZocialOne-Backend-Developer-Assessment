export function sendOnboardingReminder({ user_id, title, body }) {
  console.log("Onboarding Reminder Sent:", {
    user_id,
    title,
    body,
    sent_at: new Date(),
  });
}
