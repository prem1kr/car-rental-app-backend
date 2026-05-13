import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectMongoose from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import { createServer } from 'node:http';
import { Server } from "socket.io";
import { socketConnection } from "./config/socket.js";
import carRouter from "./routes/carRoute.js";
import profileRouter from "./routes/profileRoute.js";
import notificationRouter from "./routes/notificationRoute.js";
import sendEmail from "./utils/sendEmail.js";

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

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// ROUTES
app.use('/api/auth', authRouter);
app.use('/api/car', carRouter);
app.use('/api/profile', profileRouter);
app.use('/api/notification', notificationRouter);

app.get('/test-mail', async (req, res) => {
    try {
        await sendEmail('prem78334@gmail.com', 'Prem');
        res.send('Mail Sent');
    } catch (error) {
        console.log("FULL ERROR:", error);
        res.status(500).send(error.message);
    }
});

// socket connection
socketConnection(io);
const Room = 'group';
let adminSockedId = null;

// SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // JOIN ROOM
    socket.on('joinRoom', (userName) => {
        socket.join(Room);
        // SEND TO ALL USERS EXCEPT CURRENT USER
        socket.to(Room).emit('RoomNotice', `${userName} joined the group`);
    });

    // CHAT MESSAGE
    socket.on('chatMessage', (msg) => {
        // SEND MESSAGE TO OTHERS
        socket.to(Room).emit('chatMessage', msg);
    });

    // DISCONNECT
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

});

// START SERVER
const startServer = async () => {
    await ConnectMongoose();
    server.listen(process.env.PORT || 5000, () => {
        console.log(` Server running on port ${process.env.PORT || 5000}`);
    });
};

startServer();
