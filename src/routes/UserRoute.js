const route = require("express").Router();
const usercontroller = require("../controllers/UserController")
// import multer from "multer";
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


route.get("/users",usercontroller.getAllUser);

route.post("/user",usercontroller.addUsers)
route.post("/login",usercontroller.loginUser)
route.post('/googlelogin',usercontroller.GoogleLogin)
route.post('/changepassword',usercontroller.changePassword)
route.post('/setprofile',upload.single("profilePhoto"),usercontroller.setProfile)
route.get("/user/:id",usercontroller.getUserById)
route.post('/testimonials/:id',usercontroller.setTestimonials)
route.post('/forgot',usercontroller.forgotpassword)
route.post('/forgototp',usercontroller.forgotpasswordSendOtp)
route.post('/verifyotp',usercontroller.verifyOtp)
route.post('/reset/:id',usercontroller.resetpassword)


module.exports=route