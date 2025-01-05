import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success: false, message: "User is already registered!"})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user1 = req.body
        const newUser = await User.create({
            ...user1,
            password: hashedPassword,
        });

        //assign JWT
        const token = jwt.sign({_id: newUser._id}, "secretkey123");
        res.status(201).json({success: true, message:"User successfully registered!", token,  user:newUser});

    }catch(error){
        res.status(400).json({success: false, message: error.message})
    }
};
export const login = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({success:false, message: "Invalid Email or Password"});
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) return res.status(404).json({success:false, message:"Invalid Email or Password"})
        const token = jwt.sign({_id: user._id}, "secretkey123");
        res.status(200).json({success: true, message: "User successfully logged in!", token, user:{_id:user._id, name:user.name, email: user.email, role: user.role,}})
    }catch(error){
        res.status(400).json({success: false, message: error.message})
    }
};
