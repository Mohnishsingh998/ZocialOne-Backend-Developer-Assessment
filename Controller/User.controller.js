import { getUserDetails } from "../services/User.service.js";

export async function getDetails(req, res) {
  try {
    const userId = req.user.id;

    const details = await getUserDetails(userId);

    res.status(200).json(details);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}