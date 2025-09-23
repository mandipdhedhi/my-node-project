const adminController=require("../controllers/adminController");
const route=require("express").Router();

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


route.get("/admins",adminController.getAllAdmins);
route.post("/admin",adminController.addAdmins)
route.post("/createadmin",adminController.createAdmin)
route.post('/logo',upload.single('logo'),adminController.upadateLogo)
// route.put("/admin/:id",adminController.updateAdmin); // update admin not required as of now

module.exports=route;
