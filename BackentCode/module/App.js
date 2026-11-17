import router from "./src/Auth-router.js";
import express from "express";
import cors from 'cors';

let app = express()
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json())
app.use("/auth",router)
export default app