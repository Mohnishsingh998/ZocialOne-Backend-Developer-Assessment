import express from "express";
import sequelize1 from "./config/sequelize.js";
import authRoutes from "./Routes/auth.routes.js"
import complaintRoutes from "./Routes/complaint.routes.js";
import { startOnboardingReminderCron } from "./cron/onboardingReminder.cron.js";
import userRoutes from "./Routes/user.routes.js";
import "./models/User.Model.js";
import "./models/Complaint.model.js";
import "./models/Notification.model.js";


const app = express();
const PORT = process.env.PORT || 3000;;

app.use(express.json());

startOnboardingReminderCron();

app.use("/api", authRoutes);
app.use("/api", complaintRoutes);
app.use("/api",userRoutes);
async function startServer() {
  try {
    await sequelize1.sync({ alter: true });
    console.log("Models Synced!")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
