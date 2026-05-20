import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
export interface AuthRequest extends Request{
    //here user is optinal because before middleware runs, it doesn't exits and after middleware completes running it is stored with the decoded data
    user? : any
}

export const requireAuth = (req : AuthRequest, res : Response, next : NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }
    req.user = decoded;
    next();
}