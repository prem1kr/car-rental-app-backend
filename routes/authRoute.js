import express from "express";
import { Login, Signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/login', Login);

export default authRouter;
