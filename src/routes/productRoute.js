const express = require("express");
const { addGallery, getAllGalleries, getGalleryByUser,updateGallery,deleteGallery } = require("../controllers/productController");

const router = express.Router();

const multer =require("multer")
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

router.post("/add",upload.single("banner"), addGallery);
router.get("/all", getAllGalleries);
router.get("/user/:userId", getGalleryByUser);
router.put("/:id", updateGallery);
router.delete("/:id", deleteGallery);

module.exports = router;
