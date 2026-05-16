import mongoose, {Schema, Document} from "mongoose";
export interface IAnalytics extends Document{
    shortId: string,
    ip: string,
    userAgent: string
    timeStamp : Date
};

const analyticsSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        index: true
    },
    ip: {
        type : String,
    },
    userAgent : {
        type: String,
    },
    timeStamp : {
        type : Date,
        default : Date.now()
    }

});

export const AnalyticsModel = mongoose.model<IAnalytics>('analytics', analyticsSchema);