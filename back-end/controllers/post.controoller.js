
import Post from "../models/post.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createPost = async (req, res) => {

    try {
        let { description } = req.body
         let newPost
        if (req.file) {

            let image = await uploadOnCloudinary(req.file.path)
            let newPost = await Post.create({
                author:req.UserId,
                description,
                image,
            })
        } else {
            let newPost = await Post.create({
                author: req.UserId,
                description,
            })
        }

        return res.status(201).json(newPost)
    } catch (error) {
     return res.status(201).json(`SomeThing happne while uploading the post${error}`)
    }

}

export const getPost= async (req, res) => {

    try {
        
       const post = await Post.find( )  // it will get all the post data present in the data in the data base 
       return res.status(200).json(post)

    } catch (error) {
        return res.status(500).json({Message:"getPost error "})
    }


}

