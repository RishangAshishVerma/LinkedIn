import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';

export const signUp = async (req, res) => {
    try {
        let { firstName, lastName, userName, email, password } = req.body;
        // Check if email or username exists
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "User email already exists" });
        }

        if (await User.findOne({ userName })) {
            return res.status(400).json({ message: "User name already exists" });
        }
        // check password length is  equal ro 8 or not 
        if (password.length < 8) {
            return res.status(400).json({ message: "password must be of at least 8 charather " })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
        });

        let token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });



        res.status(201).json(user);
    } catch (error) {
        console.error("Signup error:", error); // logs full error in server console
        return res.status(500).json({
            message: "Signup error",
            error: error.message
        }); // sends error message to client
    }
}

// =================== User login ====================

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email or username exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User email does not exist " });
        }

        // compare the password 

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) { // check is password is valid or invalid 
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate token
        const token = await generateToken(user._id);

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"

        });


        return res.status(201).json(user);



    } catch (error) {
        console.error("Signup error:", error); // logs full error in server console
        return res.status(500).json({
            message: "Signup error",
            error: error.message
        }); // sends error message to client
    }
}

// =================== User logOUt ====================

export const logOut = async (req, res) => {


    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        res.status(200).json({ message: "Logout successfully" });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "logout error" });
    }

} 