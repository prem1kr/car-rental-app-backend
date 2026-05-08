import express from "express";
import { Login, Logout, Signup, User } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/login', Login);
authRouter.get('/user',authMiddleware, User);
authRouter.post('/logout', Logout);

export default authRouter;
