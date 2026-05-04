import express from "express";
import { Signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/signup', Signup);

export default authRouter;
