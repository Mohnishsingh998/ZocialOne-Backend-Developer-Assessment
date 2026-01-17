import express from "express";
import { register , login } from "../Controller/Auth.controller.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;

