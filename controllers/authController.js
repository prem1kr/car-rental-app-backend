import authModel from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
    try {
        const { role, name, email, password } = req.body;
        const IsUser = await authModel.findOne({ email });
        if (IsUser) {
            res.status(200).json({ message: "User Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await authModel.create({
            role,
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({ message: `User Signup Successfully ${user}` });
        console.log(user);

    } catch (error) {
        res.status(404).json({ message: "Server Error" });
        console.log(`Error during the signup process ${error}`)
    }
}


export const Login = async (req, res) => {
    try {
        const { role, email, password } = req.body;
        const user = await authModel.findOne({ email });
        if (!user) {
            res.status(200).json({ message: "user not registered, signup first" });
        }

        if (role && user.role !== role) {
            return res.status(403).json({
                message: `Access denied for role: ${role}`,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(501).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({
            user: {
                id: user._id,
                role: user.role,
                email: user.email,
                name: user.name
            }
        }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token);

        res.status(201).json({ message: "user Login successfully" });
        console.log(user, token);

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Server Error" });
    }
}


export const User = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await authModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "user not logged" });
        }
        res.status(201).json({ message: `user data fetched successfully ${user}` });
        console.log(userInfo, user);

    } catch (error) {
        console.log("error during user data fetching");
        res.status(500).json({ message: "Server Error" });
    }
} 