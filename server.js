import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectMongoose from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import { createServer } from 'node:http';
import { Server } from "socket.io";
import { socketConnection } from "./config/socket.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const server = createServer(app);
const io = new Server(server);

socketConnection(io);

app.use('/api/auth', authRouter);

const startServer = async () => {
    await ConnectMongoose();

    server.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
};

startServer();