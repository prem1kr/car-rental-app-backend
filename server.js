import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectMongoose from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const startServer = async () => {
    await ConnectMongoose();

    app.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
};

startServer();