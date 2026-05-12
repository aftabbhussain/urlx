import mongoose, {Schema, Document} from "mongoose";

export interface IUrl extends Document {
    longUrl : string;
    shortId : string;
    createdAt : Date;
}

const UrlSchema = new Schema({
    longUrl : {
        type: String,
        required : true,

    },
    shortId : {
        type: String,
        required: true,
        unique: true,
        index: true,

    },
    createdAt : {
        type: Date,
        default : Date.now
    }
})

export const UrlModel = mongoose.model<IUrl>('url', UrlSchema);

