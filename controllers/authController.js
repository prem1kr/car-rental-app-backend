import authModel from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

export const Signup = async (req, res) => {
    try {
        const { role, name, email, password } = req.body;
        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await authModel.create({
            role,
            name,
            email,
            password: hashPassword,
        });
        await sendEmail(email, name);


        return res.status(201).json({
            message: "Signup successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not registered" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        if (role && role !== user.role) {
            return res.status(403).json({
                message: `Access denied. You are registered as ${user.role}`,
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


export const User = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await authModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User data fetched successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


export const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ success: true, message: 'Logout Successful' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Logout failed', error: error.message });
    }
}