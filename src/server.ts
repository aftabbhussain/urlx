import express, {Request, Response} from "express"
import dotenv from "dotenv";
import { connectDB } from "./db";
import urlRoutes from "./routes/urlRoutes";
import { connectRedis } from "./services/redis";

dotenv.config();

import './workers/analyticsWorker';

const app = express();

// Initialize Redis connection
connectRedis().catch((err) =>{
    console.error("Error connecting with redis", err);
});

connectDB();

app.use(express.json());

app.use('/', urlRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})