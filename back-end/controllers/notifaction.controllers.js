import Notifaction from "../models/notification.model.js"

export const getNotifaction = async (req, res) => {
    try {
        let notification = await Notification.find({ receiver: req.userID })
            .populate("relatedUser", "firstName lastName profileImage")
            .populate("relatedPost", "profileImage descripion")
        return res.status(200).json(notification)
    } catch (error) {
        return res.status(500).json({ Message: `get noftifaction errro ${error}` })
    }

}
export const deleteNotifaction = async (req, res) => {
    try {
        let { id } = req.params
        let notification = await Notification.findOneAndDelete({
            _id: id,
            receiver: req.userID
        })
        return res.status(200).json({ Message: "notifation delet" })
    } catch (error) {
        return res.status(500).json({ Message: `deleted noftifaction errro ${error}` })
    }
} 

export const clearAllNotifaction = async (req, res) => {
    try {
        let notification = await Notification.deleteMany({
            receiver: req.userID
        })
        return res.status(200).json({ Message: " clear notifation delet" })
    } catch (error) {
        return res.status(500).json({ Message: `deleted all noftifaction errro ${error}` })
    }
} 