/* eslint-disable no-undef */
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import multer from "multer";
import path from "path";
import config from "../config";
// Cloudinary Configuration
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
});
// Function to send image to Cloudinary and delete temp file
export const sendImageToCloudinary = async (
  imageName: string,
  path: string
) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
      folder: "tourist_attractions", // optional folder
    });
    console.log("Image uploaded to Cloudinary:", uploadResult.secure_url);

    // Delete temp file
    await fs.unlink(path);
    console.log("Temporary file deleted:", path);

    return uploadResult;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), '/uploads/'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage });