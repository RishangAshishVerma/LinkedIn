import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    CoverImage: {
        type: String,
        default: ""
    },
    headline: {
        type: String,
        default: ""
    },
    skills: [
        {
            type: String,
        }
    ],
    education: [
        {
            college: { type: String },
            degree: { type: String },
            feildOfStudy: { type: String },
        }
    ],
    location: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    experience: [{
        title: { type: String },
        company: { type: String },
        description: { type: String },
    }],
    connection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'  
        }
    ]


}, { timestamps: true })

const User = mongoose.model("User",userSchema)
export default User