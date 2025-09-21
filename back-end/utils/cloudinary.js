import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filePath) {
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(filePath);

    // delete local file after successful upload
    fs.unlinkSync(filePath);

    return uploadResult.secure_url || null;
  } catch (error) {
    // make sure file exists before deleting
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error(error);
    return null;
  }
};

export default uploadOnCloudinary;
