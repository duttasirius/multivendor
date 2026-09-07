import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (file: Blob): Promise<string> => {
  if (!file) {
    throw new Error("No file provided");
  }

  try {
    console.log("Cloudinary upload started");
    console.log("File size:", file.size);
    console.log("File type:", file.type);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Buffer created:", buffer.length);

    return await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "profiles",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary stream error:", error);
            reject(error);
            return;
          }

          if (!result?.secure_url) {
            const error = new Error("Cloudinary did not return a secure URL");

            console.error("Cloudinary response error:", error);
            reject(error);
            return;
          }

          console.log("Cloudinary upload successful");
          console.log("Cloudinary URL:", result.secure_url);

          resolve(result.secure_url);
        },
      );

      uploadStream.on("error", (error) => {
        console.error("Cloudinary upload stream error:", error);
        reject(error);
      });

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadCloudinary;
