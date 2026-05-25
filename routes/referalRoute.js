import express from "express";
import { applyReferal, generateReferal, getReferal } from "../controllers/referalController.js";

const referalRouter = express.Router();

referalRouter.post("/generate-code/:userId", generateReferal);
referalRouter.post("/apply-code/:newUserId", applyReferal);
referalRouter.get("/referal-details/:userId", getReferal);

export default referalRouter;
