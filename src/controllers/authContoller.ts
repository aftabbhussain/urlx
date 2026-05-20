import { UserModel } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res : Response) => {
    const {email, password} = req.body;
    try{
        const userExists = await UserModel.findOne({email});
        if(userExists){
            return res.status(400).json({
                error: "Email already exists!"
            });
        }
        const HashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            email: email,
            password: HashedPassword
        });
        const token = generateToken(newUser._id.toString());
        return res.status(201).json({
            message: "Account created successfully",
            token
        })
    }
    catch(error){
        console.error("Register error ", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}
export const login = async (req: Request, res : Response) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({
                error : "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                error: "Invalid Credentials"
            });
        }
        const token = generateToken(user._id.toString());
        return res.status(200).json({
            message: "Login successfull",
            token
        });

    }
    catch(error){
        console.error("Login error: ", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}