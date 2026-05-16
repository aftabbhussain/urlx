import { UrlModel } from "../models/Url";
import { Request, Response } from "express";
import { generateId } from "../services/idGenerator";
import redisClient from "../services/redis";
import { analyticsQueue } from "../services/queue";

//function to shorten the url and store in the mongodb database
export const shortenUrl = async (req: Request, res: Response) => {
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
}

//function to redirect url
export const redirectUrl = async (req: Request, res: Response) => {
    const shortId = req.params.shortId;
    
    //analytics payload
    const clickData = {
        shortId : shortId,
        ip : req.ip || req.socket.remoteAddress || "unknown",
        userAgent :  req.headers['user-agent'] || "unknown",
        timeStamp : new Date()

    };
    try{
        const cachedUrl = await redisClient.get(shortId as string);
        if(cachedUrl){
            //cache hit
            
            analyticsQueue.add('record-click', clickData);
            console.log("cache hit!");
            return res.status(200).json({
                longUrl : cachedUrl
            })
        }
        console.log("cache miss!");
        const existingUrl = await UrlModel.findOne({shortId: shortId});
        if(existingUrl){
            await redisClient.setEx(shortId as string, 3600, existingUrl.longUrl as string);

            analyticsQueue.add('record-click', clickData);
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

}