// controllers/post.controller.js
import Post from "../models/post.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createPost = async (req, res) => {
    try {
        let { description } = req.body
        let newPost

        if (req.file) {
            let image = await uploadOnCloudinary(req.file.path)
            newPost = await Post.create({
                author: req.userId,   // fixed req.UserId → req.userId
                description,
                image,
            })
        } else {
            newPost = await Post.create({
                author: req.userId,   // fixed req.UserId → req.userId
                description,
            })
        }

        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(500).json({ message: `Something happened while uploading the post: ${error}` }) // fixed status code + formatting
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.find()  
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ message: "getPost error" })
    }
}

export const like = async (req, res) => {
    try {
        let postId = req.params.id
        let userId = req.userId

        let post = await Post.findById(postId) // fixed: don't shadow Post model
        if (!post) {
            return res.status(400).json({ message: "post not found" })
        }

        if (post.like.includes(userId)) {
            post.like = post.like.filter((id) => id.toString() !== userId.toString()) // fixed filter
        } else {
            post.like.push(userId)
        }

        await post.save()
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).json({ message: `There was an error while liking the post: ${error}` })
    }
}

export const comment = async (req, res) => {
    try {
        let postId = req.params.id
        let userId = req.userId
        let { content } = req.body
         
        let post = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: { content, user: userId } } }, // fixed "comment" → "comments"
            { new: true }
        ).populate("comments.user", "firstName lastName userName profileImage headline")

        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ message: `There was some error while commenting: ${error}` }) // fixed res.(500)
    }
}













































// import Post from "../models/post.model.js"
// import uploadOnCloudinary from "../utils/cloudinary.js"

// export const createPost = async (req, res) => {

//     try {
//         let { description } = req.body
//         let newPost
//         if (req.file) {

//             let image = await uploadOnCloudinary(req.file.path)
//             let newPost = await Post.create({
//                 author: req.UserId,
//                 description,
//                 image,
//             })
//         } else {
//             let newPost = await Post.create({
//                 author: req.UserId,
//                 description,
//             })
//         }

//         return res.status(201).json(newPost)
//     } catch (error) {
//         return res.status(201).json(`SomeThing happne while uploading the post${error}`)
//     }

// }

// export const getPost = async (req, res) => {

//     try {

//         const post = await Post.find()  // it will get all the post data present in the data in the data base 
//         return res.status(200).json(post)

//     } catch (error) {
//         return res.status(500).json({ Message: "getPost error " })
//     }


// }

// export const like = async (req, res) => {

//     try {
//         let postId = req.params.id
//         let userId = req.userId

//         let Post = await Post.findById(postId)
//         if (!Post) {
//             return res.status(400).json({ message: "post not found" })
//         }
//         if (Post.like.includes(userId)) {
//             Post.like.filter((id) => id != userId)
//         } else {
//             Post.like.push(userId)
//         }
//         await post.save()
//         return res.status(200).json(post)
//     } catch (error) {
//  return res.status(400).json({ message: `there was an error while likeing the post${error}` })
//     }

// }

// export const comment = async (req,res)=>{
//     try {
//         let postId=req.params.id
//         let userId=req.userId
//         let { content } = req.body
         
//          let post = await Post.findByIdAndUpdate(postId,{
//             $push:{comment:{content,user:userId}}
//          },{new:true})
//        .populate("comment.user","firstName lastName userName profileImage headline")

//        return res.status(200).json(post)
//     } catch (error) {
//         return res.(500).json({message:`"there was some error while commenting ${error}`})
//     }
// }