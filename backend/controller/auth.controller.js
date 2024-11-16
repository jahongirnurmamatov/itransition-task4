import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generatTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        if(!name||!email||!password){
            return res.status(400).json({sucess:false,message: 'Please provide all the required fields'});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({name,email,password:hashedPassword});

        await user.save();
        generatTokenAndSetCookie(res,user._id);
        res.json({success:true,message:'User registered successfully',user:{...user._doc, password:undefined}});
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message: error.message});
    }   
}
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(req.body)
        if(!email||!password){
            return res.status(400).json({sucess:false,message: 'Please provide all the required fields'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message: 'Invalid credentials'});
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({success:false,message: 'Invalid credentials'});
        }
        generatTokenAndSetCookie(res,user._id);
        user.lastLogin =  new Date;
        await user.save();

        res.json({success:true,message:'Logged in successfully',user:{...user._doc, password:undefined}});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message: error.message});
    }
}
export const logout = async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({success:true,message:"User logged out"})
}
export const checkauth = async(req,res)=>{
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(401).json({success:false,message: 'Not authenticated'});
        }
        res.status(200).json({success:true,user});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message: error.message});
    }
}