import express from "express";
import { Login, Signup, User } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/login', Login);
authRouter.get('/user/:id', User);

export default authRouter;
