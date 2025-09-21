import { json } from "express";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
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