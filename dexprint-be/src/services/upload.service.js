const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../database/cloud.config");

// Konfigurasi Storage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "dexprint",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
  }),
});

// Multer dengan limit dan error handling
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maks 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only JPG, PNG, and WEBP formats are allowed!"),
        false
      );
    }
    cb(null, true);
  },
});

module.exports = upload;
