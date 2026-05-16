import { timeStamp } from "node:console";
import { AnalyticsModel } from "../models/Analytics";
import { UrlModel } from "../models/Url";
import { Request, Response } from "express";

//function to fetch the analytics of a shortId
export const getAnalytics = async (req: Request, res : Response) => {
    const {shortId} = req.params;
        try{
            const urlexists = await UrlModel.exists({shortId});
            if(!urlexists){
                return res.status(404).json({
                    error: "Short Url doesn't exists"
                });
            }
            //count totalClicks logic
            const totalClicks =  await AnalyticsModel.countDocuments({shortId});

            //grab 10 most recent clicks logic, sorted by most recent .sort({timeStamp:-1}) and project(columns) only the ip, userAgent, timeStamp and hide the id
            const recentClicks = await AnalyticsModel.find({shortId: shortId}).sort({timeStamp:- 1}).limit(10).select('ip userAgent timeStamp -_id');
            return res.status(200).json({
                shortId,
                totalClicks,
                recentClicks,
            });
        }
        catch(err){
            console.error("Analytics Error", err);
            return res.status(500).json({
                error: "Failed to fetch analytics"
            });
        }
    
};