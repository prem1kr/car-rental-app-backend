// ===============================
// BACKEND SOCKET SERVER
// ===============================

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectMongoose from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { socketConnection } from "./config/socket.js";
// import carRouter from "./routes/carRoute.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// ROUTES
app.use('/api/auth', authRouter);
socketConnection();

// STORE ADMIN SOCKET ID
let adminSocketId = null;

// SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // ADMIN CONNECT
    socket.on('adminJoin', () => {
        adminSocketId = socket.id;
        console.log('Admin connected with socket id:',adminSocketId);
    });

    // USER MESSAGE TO ADMIN
    socket.on('sendToAdmin', (msgData) => {
        console.log('User Message:', msgData);
        // SEND ONLY TO ADMIN
        io.to(adminSocketId).emit(
            'receiveUserMessage',
            msgData
        );
    });

    // ADMIN REPLY TO USER
    socket.on('adminReply', (data) => {
        console.log('Admin Reply:', data);
        io.to(data.targetSocketId).emit(
            'receiveAdminReply',
            data
        );
    });

    // DISCONNECT
    socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
        // REMOVE ADMIN SOCKET
        if (socket.id === adminSocketId) {
            adminSocketId = null;
        }
    });

});

// START SERVER
const startServer = async () => {
    await ConnectMongoose();
    server.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
};

startServer();