import { DataTypes } from "sequelize";
import sequelize1 from "../config/sequelize.js";

const Complaint = sequelize1.define(
  "Complaint",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    complaint_type: {
      type: DataTypes.ENUM(
        "live_demo",
        "technical_issue",
        "billing_issue",
        "feedback",
      ),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "raised",
        "in_progress",
        "waiting_on_user",
        "resolved",
        "closed",
      ),
      allowNull: false,
      defaultValue: "raised",
    },

    details: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },

    status_updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "complaints",
    timestamps: false,

    hooks: {
      beforeUpdate: (complaint) => {
        if (complaint.changed("status")) {
          complaint.status_updated_at = new Date();
        }
      },
    },
  },
);

export default Complaint;
