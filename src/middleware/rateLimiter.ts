import redisClient from "../services/redis";
import { Request, Response, NextFunction } from "express";

export const rateLimiter = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        const LIMIT = 5;
        const WINDOW_TIME = 60;
        const ip = req.ip || req.socket.remoteAddress || "unknown";
        const redisKey = `rate_limit:${ip}`; // using this identifier for rate limiting
        
        const currentCount = await redisClient.get(redisKey);

        if(currentCount && parseInt(currentCount) >= LIMIT){
            return res.status(429).json({
                error: "Too many requests, please try again later"
            })
        }
        await redisClient.incr(redisKey);

        //this will run for only a single time(first time), if its the first request initiate the 60 second timer and counter
        if(!currentCount){
            redisClient.expire(redisKey, WINDOW_TIME);
        }
        //now we allow to controllers
        next();
    }
    catch(err){
        //if the redis fails, we don't break the API and still allow access
        console.error("Rate Limiter error : ", err);
        next();
    }
    
}