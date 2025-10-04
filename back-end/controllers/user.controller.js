import { connect } from "mongoose";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import Connection from "../models/connection.model.js";
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);

        return res.status(404).json({ message: "error whille geting Current User" });
    }

}

export const updateProfile = async (req, res) => {

    try {
        let { gender, location, headline, firstName, lastName, userName } = req.body
        let skills = req.body.skills ? JSON.parse(req.body.skills) : [] // covert array to stings 
        let education = req.body.skills ? JSON.parse(req.body.education) : [] // covert array to stings 
        let experience = req.body.skills ? JSON.parse(req.body.experience) : [] // covert array to stings 
        let CoverImage
        let profileImage
        console.log(req.files);

        if (req.files.profileImage) {
            profileImage = await uploadOnCloudinary(req.files.profileImage[0].path)
        }
        if (req.files.profileImage) {
            CoverImage = await uploadOnCloudinary(req.files.profileImage[0].path)
        }

        let user = await User.findByIdAndUpdate(req.userId, {
            experience, gender, location, education, headline, skills, firstName, lastName, userName, profileImage, CoverImage
        }, { new: true }).select("-password")

        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "their is some problem while updateing the user profile" })

    }

}

export const getUserProfile = async (req, res) => {
    try {
        let { username } = req.params;
        console.log("Requested username:", username);

        const user = await User.findOne({ userName: { $regex: `^${username.trim()}$`, $options: "i" } }).select("-password");

        if (!user) {
            console.log("User not found in DB");
            return res.status(400).json({ message: "user does not exist" });
        }

        console.log("Found user:", user);
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "there is some error while getting user profile" });
    }
}

export const searchUser = async (req, res) => {
    try {
        let { query } = req.query
        if (!query) {
            return res.status(400).json({ message: "query is required" })
        }

        let users = await User.find({
            $or: [
                { firstName: { $regex: query, $options: "i" } },
                { lastName: { $regex: query, $options: "i" } },
                { userName: { $regex: query, $options: "i" } },
                { skills: { $in: [query] } },
            ]
        })

        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `there is an while getting user trhough query search error ${error}` });
    }

}

    export const getSuggestedUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId).select("connections");

        if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
        }
        const suggestedUsers = await User.find({
        _id: { 
            $ne: currentUser._id, 
            $nin: currentUser.connections 
        }
        }).select("-password");

        return res.status(200).json(suggestedUsers);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `suggest user error ${error}` });
    }
    };
