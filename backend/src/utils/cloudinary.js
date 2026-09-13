import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    console.error("Failed to upload file on cloudinary", error);
    return null;
  } finally {
    if (!localFilePath) return null;
    fs.unlinkSync(localFilePath); // remove temp file on local server
  }
};

const deleteOnCloudinary = async (publicId, resourceType) => {
  const deleteResult = await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
    invalidate: true,
  });

    return deleteResult
};

export { uploadOnCloudinary, deleteOnCloudinary };
