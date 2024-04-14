import { v2 as cloudinary } from "cloudinary";
import { url } from "inspector";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  url: string;
}

interface CloudinaryDestroyResult {
  result: string;
}

export const upload_file = async (file: string, folder: string) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder,
  });

  const uploadResult: CloudinaryUploadResult = {
    public_id: result.public_id,
    url: result.url,
  };

  return uploadResult;
};

export const delete_file = async (file: string) => {
  const res: CloudinaryDestroyResult = await cloudinary.uploader.destroy(file);

  if (res?.result === "ok") return true;
};
