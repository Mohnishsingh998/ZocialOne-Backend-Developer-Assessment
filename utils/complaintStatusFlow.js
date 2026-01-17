export const STATUS_FLOW = {
  raised: ["in_progress"],
  in_progress: ["waiting_on_user", "resolved"],
  waiting_on_user: ["in_progress"],
  resolved: ["closed"],
  closed: [],
};

export function isValidStatusTransition(from, to) {
  return STATUS_FLOW[from]?.includes(to);
}
