import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authenticationRoutes from './routes/authentication.routes.js'
dotenv.config();


const app = express();

app.use("/api/authentication", authenticationRoutes)

app.listen(3000, () => {
    connectDB();
    console.log("server is running on port 300")
})

