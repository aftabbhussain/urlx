import mongoose, {Document} from "mongoose";

export interface IUser extends Document{
    email : string,
    password : string,
    createdAt : Date
}

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        unique : true,
        index : true
    },
    password : {
        type: String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);