import Connection from "../models/connection.model.js"
import User from "../models/user.model.js"
import { io, userSocketMap } from "../index.js"

export const sendConnection = async (req, res) => {
    try {
        let { id } = req.params
        let sender = req.userId
        let user = await User.findById(sender)

        if (sender === id) {
            return res.status(400).json({ Message: "you can not request to yourself " })
        }

        if (user.connection.includes(id)) {
            return res.status(400).json({ Message: "your already connected" })
        }

        let existingConnection = await Connection.findOne({
            sender: sender,
            receiver: id,
            status: "pending"
        });

        if (existingConnection) {
            return res.status(400).json({ Message: "request already exist" })
        }

        let newRequest = await Connection.create({
            sender,
            receiver: id,
        })

        return res.status(200).json(newRequest)

        // using web socket here we have use socket id to give the real time update to the selceted user not all like like and comment 
        let receiverSocketId = userSocketMap.get(id)
        let senderSocketId = userSocketMap.get(sender)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("statusUpate", { updatedUserId: sender, newStatus: "recevied" })
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("statusUpate", { updatedUserId: id, newStatus: "pending" })
        }

    } catch (error) {
        return res.status(500).json({ Message: `sendconnection error ${error}` })
    }
}

export const acceptConnection = async (req, res) => {
    try {
        let { connectionId } = req.params
        let connection = await Connection.findById(connectionId)

        if (!connection) {
            return res.status(400).json({ message: " connection dosenot exist" })
        }
        if (connection.status != "pending") {
            return res.status(400).json({ message: "request under process " })
        }

        connection.status = "accepted"
        await connection.save()
        await User.findByIdAndUpdate(req.userId, {
            $addToSet: { connection: sender._id }
        })
        await User.findByIdAndUpdate(connection.sender._id, {
            $addToSet: { connection: req.userId }
        })
        // using web socket here we have use socket id to give the real time update to the selceted user not all like like and comment 

        let receiverSocketId = userSocketMap.get(connection.receiver._id.toString())
        let senderSocketId = userSocketMap.get(connection.sender._id.toString())

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("statusUpate", { updatedUserId: connection.sender._id, newStatus: "Disconnect", })
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("statusUpate", { updatedUserId: req.userId, newStatus: "Disconnect" })
        }

        return res.status(200).json({ message: "connection accepted" })

    } catch (error) {
        return res.status(500).json({ message: `connection accepted error ${error}` })
    }
}

export const rejectConnection = async (req, res) => {
    try {
        let { connectionId } = req.params
        let connection = await Connection.findById(connectionId)

        if (!connection) {
            return res.status(400).json({ message: " connection dosenot exist" })
        }
        if (connection.status != "pending") {
            return res.status(400).json({ message: "request under process " })
        }

        connection.status = "rejected"
        await connection.save()


        return res.status(200).json({ message: "connection rejected" })

    } catch (error) {
        return res.status(500).json({ message: `connection rejected error ${error}` })
    }
}

export const getConnectionStatus = async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        const currentUserId = req.userId;

        let currentUser = await User.findById(currentUserId)
        if (currentUser.connection.includes(targetUserId)) {
            return res.json({ status: "disconnect" });
        }

        const pendingRequest = await Connection.findOne({
            $or: [
                { sender: currentUserId, receiver: targetUserId },
                { sender: targetUserId, receiver: currentUserId },
            ],
            status: "pending",
        });

        if (pendingRequest) {
            if (pendingRequest.sender.toString() === currentUserId.toString()) {
                return res.json({ status: "pending" });
            } else {
                return res.json({ status: "received", requestId: pendingRequest._id });
            }
        }

        return res.json({ status: "connect" });
    } catch (error) {
        return res.status(500).json({ message: `error while getting connectiion status ${error}` })
    }
}

export const removeConnection = async (req, res) => {
    try {
        const myId = req.userId;
        const otherUserId = req.params.userId;

        await User.findByIdAndUpdate(myId, { $pull: { connection: otherUserId } });

        await User.findByIdAndUpdate(otherUserId, { $pull: { connection: myId } });

        return res.json({ message: "connection removed successfully" });
        // using web socket here we have use socket id to give the real time update to the selceted user not all like like and comment 

        let receiverSocketId = userSocketMap.get(otherUserId)
        let senderSocketId = userSocketMap.get(myId)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("statusUpate", { updatedUserId: myId, newStatus: "connect", })
        }   

        if (senderSocketId) {
            io.to(senderSocketId).emit("statusUpate", { updatedUserId: otherUserId, newStatus: "connect" })
        }

    } catch (error) {
        return res.status(500).json({ message: `there is error while removeing the connection ${error}` })
    }
}

export const getConnectionRequest = async (req, res) => {
    try {
        const userId = req.userId

        const requests = await Connection.find({
            receiver: userId, status: "pending"
        }).populate("sender", "firstName lastName email userName profileImage headline")

        return res.status(200).json(requests)
    } catch (error) {
        return res.status(500).json({ message: `sever error ${error}` })
    }
}
// check this code down one 
export const getUserConnections = async (req, res) => {
    try {
        const userId = req.userId;  // logged-in user

        // find the user and populate his connections
        const user = await User.findById(userId)
            .populate("connection", "firstName lastName email userName profileImage headline");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // send back the connections
        return res.status(200).json(user.connection);

    } catch (error) {
        return res.status(500).json({ message: `error while getting user connections ${error}` });
    }
};    