import express from "express";
import { Login, Logout, Signup, TotalUser, User } from "../controllers/authController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/login', Login);
authRouter.get('/user', User);
authRouter.post('/logout', Logout);
authRouter.get('/total-user', TotalUser);

export default authRouter;
