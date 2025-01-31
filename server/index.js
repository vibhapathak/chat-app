import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import contactRoutes from "./routes/ContactsRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import multer from 'multer';
import setupSocket from "./socket.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL =  process.env.DATABASE_URL;
console.log("Allowed Origin:", process.env.ORIGIN);
app.use(
    cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
    credentials: true,
})
);
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

const server = app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
});
setupSocket(server);
mongoose.connect(databaseURL).then((
)=>console.log('database connected')).catch(
    (err)=>console.log(err.message));