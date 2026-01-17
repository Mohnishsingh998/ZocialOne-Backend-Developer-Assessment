export function getOnboardingReminder(stage, hours) {
  const templates = {
    0: {
      24: {
        title: "Complete your onboarding",
        body: "You are just getting started. Complete Stage 0 to move ahead.",
      },
      72: {
        title: "Need help getting started?",
        body: "Most users complete onboarding in minutes. Let us help.",
      },
      120: {
        title: "Finish onboarding to unlock features",
        body: "Complete onboarding to access all features.",
      },
    },
    1: {
      12: {
        title: "You're halfway there",
        body: "Finish Stage 1 to continue onboarding.",
      },
      24: {
        title: "Complete the next step",
        body: "You're close to completing onboarding.",
      },
    },
    2: {
      24: {
        title: "Almost done!",
        body: "Complete the final onboarding step.",
      },
      24.1: {
        title: "Final reminder",
        body: "Finish onboarding to activate your account fully.",
      },
      72: {
        title: "Don't miss out",
        body: "Complete onboarding to start using the platform.",
      },
      120: {
        title: "Account pending activation",
        body: "Complete onboarding to avoid account restrictions.",
      },
    },
  };

  return templates[stage]?.[hours];
}
