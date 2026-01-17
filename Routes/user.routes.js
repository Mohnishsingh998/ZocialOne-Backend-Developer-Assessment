import express from "express";
import { getDetails } from "../Controller/User.controller.js";
import authMiddleware from "../Middlewares/Auth.middleware.js";

const router = express.Router();

router.get("/user/details", authMiddleware, getDetails);

export default router;
