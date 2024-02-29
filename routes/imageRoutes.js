// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageController = require("../controllers/imageController");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), imageController.uploadImage);
router.post(
  "/uploads",
  upload.array("image", 10),
  imageController.uploadImages
);
module.exports = router;
