import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "the quick brown fox jumps over the lazy dog";

export const generateToken = (userId: string) : string => {
    return jwt.sign(userId, JWT_SECRET);
}

export const verifyToken = (token : string) : any => {
    try{
        return jwt.verify(token, JWT_SECRET);
    }
    catch{
        return null;
    }
}