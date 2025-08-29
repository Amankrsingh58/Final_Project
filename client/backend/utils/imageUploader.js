const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder = 'default_folder', height, quality) => {
  try {
    const options = {
      folder: folder,
      resource_type: 'auto',
    };

    if (height) {
      options.height = height;
      options.crop = 'scale'; 
    }

    if (quality) {
      options.quality = quality;
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);

    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Error uploading image to Cloudinary'); 
  }
};
