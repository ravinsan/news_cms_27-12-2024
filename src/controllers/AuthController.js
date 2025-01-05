
import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
            const user = await User.findOne({email:email});
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch)
            {
                return res.status(404).json({message: "Invalid credentials"});
            }
            const payload = {id:user._id, name:user.name, email:user.email, mobile:user.mobile};
            const token = jwt.sign({payload,}, process.env.JWT_SECRET, {expiresIn: "12000h"});

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: "none",
                secure: true,
            });

            return res.status(200).json({message:"User is successfully logged in.", data:payload, token: token,});
    }
    catch(err){
        return res.status(500).json({
            message: err.message,
        });
    }
}