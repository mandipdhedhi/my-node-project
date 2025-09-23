const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors())


// app.get('/',(req,res)=>{
//     res.json({
//         name:"mandip"
//     })
// })
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

 const userroute=require("./src/routes/UserRoute")
 app.use(userroute); 

 const translationRoutes = require("./src/routes/TranslationRoute");
app.use("/api/translations", translationRoutes);
 
const galleryRoutes = require("./src/routes/productRoute");
app.use(galleryRoutes);

const adminRoutes = require("./src/routes/adminRoute");
app.use(adminRoutes);
mongoose.connect("mongodb://localhost:27017/node").then(
    ()=>{console.log("Database Connected successfuly..")}
)

 const PORT=3001;
            app.listen(PORT,()=>{
    console.log("server started successfully PORT...",PORT);
})    





