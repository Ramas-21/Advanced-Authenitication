import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authenticationRoutes from './routes/authentication.routes.js'
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/authentication", authenticationRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`)
})

