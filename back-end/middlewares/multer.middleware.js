import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';


let storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null, './public'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
    
})
const upload = multer({ storage });

export default upload;