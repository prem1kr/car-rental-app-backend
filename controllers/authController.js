import authModel from "../models/authModel";
import bcrypt from "bcryptjs";

export const Signup = async(req, res) => {
    try{
        const {role,name,email,password} = req.body;
        const IsUser = await authModel.findOne({email});
        if(IsUser){
            res.status(200).json({message:"User Email already exists"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await authModel.create({
            role,
            name,
            email,
            password:hashPassword
        });

        res.status(201).json({message:`User Signup Successfully ${user}`});
        console.log(user);

    }catch(error){
        res.status(404).json({message:"Server Error"});
        console.log(`Error during the signup process ${error}`)
    }
}