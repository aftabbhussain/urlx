import express, {Request, Response} from "express"
import dotenv from "dotenv";
import { connectDB } from "./db";
import urlRoutes from "./routes/urlRoutes";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/', urlRoutes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})