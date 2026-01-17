import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize1 = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);
//  Runnig the Test - sync DB
(async () => {
  try {
    await sequelize1.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
})();

export default sequelize1;
