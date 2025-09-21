import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const upload = multer({ storage });

let storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }

})

export default upload;