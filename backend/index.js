import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
dotenv.config();


const app = express();
app.listen(3000, () => {
    connectDB();
    console.log("server is running on port 300")
})

