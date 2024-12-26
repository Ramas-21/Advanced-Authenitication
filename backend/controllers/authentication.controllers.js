import bcryptjs from "bcryptjs";
import { userModel } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";


export const signup = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        if(!email || !password || !name){
            throw new Error ("All fields are required");
        }

        const userAlreadyExists = await userModel.findOne({email})
        if(userAlreadyExists){
            return res.status(400).json({ success:false, message:"user already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        //create a new user
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new userModel ({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })

        await user.save();

        // JWT sending verification email with the token after a successiful signup
        generateTokenAndSetCookie(res, user._id)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            },
        });
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    res.send("login route")
}

export const logout = async (req, res) => {
    res.send("logout route")
}