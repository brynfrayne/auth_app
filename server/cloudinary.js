// cloudinary config

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinaryConfig = cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
  });

  const storage = new CloudinaryStorage({
      cloudinary:cloudinary,
      params: {
          folder: "DEV",
      },
  });

// multer config variables
const multer = require('multer');

const upload = multer({
    // storage: multerConfig,
    storage:storage
    // fileFilter: isImage
});
const uploadImage = upload.single('photo');


module.exports = {
    cloudinary, CloudinaryStorage, storage, cloudinaryConfig, upload, uploadImage
}
