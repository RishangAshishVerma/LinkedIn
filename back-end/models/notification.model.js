 import mongoose from "mongoose";

 const notifactionSchema = new mongoose.Schema({

receiver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
type:{
    type:String,
    enum:["like","comment","connectionAccepted"]
},
relatedUser:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
relatedPost:{
type:mongoose.Schema.Types.ObjectId,
ref:"Post"
},

 },{timestamps:true})

const Notifaction = mongoose.model("Notifaction",notifactionSchema)

export default Notifaction