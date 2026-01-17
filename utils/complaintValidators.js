export function validateComplaintDetails(type, details) {
  switch (type) {
    case "live_demo": {
      const {
        preferred_date,
        preferred_time,
        demo_type,
      } = details;

      if (!preferred_date || !preferred_time) {
        throw new Error(
          "preferred_date and preferred_time are mandatory for live_demo"
        );
      }

      if (!["online", "offline"].includes(demo_type)) {
        throw new Error("demo_type must be online or offline");
      }

      break;
    }

    case "technical_issue": {
      const { issue_description } = details;

      if (!issue_description) {
        throw new Error("issue_description is mandatory for technical_issue");
      }

      break;
    }

    case "billing_issue": {
      const { invoice_id, amount, currency } = details;

      if (!invoice_id || !amount || !currency) {
        throw new Error(
          "invoice_id, amount, and currency are mandatory for billing_issue"
        );
      }

      break;
    }

    case "feedback":
      break;

    default:
      throw new Error("Invalid complaint type");
  }
}
