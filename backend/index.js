import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import authenticationRoutes from './routes/authentication.routes.js'
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows us to parse incoming requests  :req.body
app.use(cookieParser()); // allows us to pass incoming cookies

app.use("/api/authentication", authenticationRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`)
})

