import express, {Request, Response} from "express"
import {UrlModel} from "./models/Url"
import { generateId } from "./services/idGenerator";
import dotenv from "dotenv";
import { connectDB } from "./db";


dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.post('/shorten', async (req: Request, res: Response) => {
    const longUrl = req.body.longUrl;
    if(!longUrl){
        return res.status(400).json({
            error: "longUrl is required"
        });
    }

    try{
        new URL(longUrl); //check if the given url is valid or not
    }
    catch(error){
        return res.status(400).json({
            error: "Invalid Url"
        });
    }

    
    try{
        const existingUrl = await UrlModel.findOne({longUrl: longUrl});
        if(existingUrl){
            return res.status(200).json({shortId: existingUrl.shortId});
        }
        //if the long url doesn't exist, we create one
        const shortId = generateId(5);
        const newUrl = await UrlModel.create({
            longUrl: longUrl,
            shortId: shortId
        });
        return res.status(201).json({
            message: "ShortId created successfully",
            data: newUrl
        })


    }
    catch(error){
        return res.status(500).json({
            error: "Internal server error"
        })
    };
})

app.get('/:shortId', async (req: Request, res: Response) => {
    const shortId = req.params.shortId;
    try{
        const existingUrl = await UrlModel.findOne({shortId: shortId});
        if(existingUrl){
            return res.status(200).json({
                longUrl: existingUrl.longUrl
            });
        }
        return res.status(404).json({
            error: "Url not found"
        })
    }
    catch(error){
        return res.status(500).json({
            error: "Internal server error"
        })
    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})