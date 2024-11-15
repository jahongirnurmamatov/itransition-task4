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

}
export const logout = async(req,res)=>{

}