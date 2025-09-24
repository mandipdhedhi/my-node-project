const adminModel=require('../models/Admin');

const getAllAdmins=async(req,res)=>{
    const getalladmins=await adminModel.find();
    res.json({  
        message:"display all admins",
        data:getalladmins
    })
}
const addAdmins = async (req, res) => {
  try {
     
    const admin = await adminModel.findById("68d142c531e21c97b30934e4");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.socialMedia = req.body.socialMedia;


    await admin.save();

    res.status(200).json({
      message: "Admin updated successfully!",
      data: admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating admin",
      err: err.message,
    });
  }
};


const createAdmin = async (req, res) => {
    try {
        const existingAdmin = await adminModel.findOne();
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }       
        const newAdmin = await adminModel.create(req.body);
        res.status(201).json({
            message: "Admin created successfully",
            data: newAdmin
        });
    }
    catch (err) {       
        console.log(err);
        res.status(500).json({  
            message: "Error creating admin",
            err: err.message
        });
    }
}


const updateAdmin=async(req,res)=>{
    try{
        const adminId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(adminId)){
            return res.status(400).json({       
                message:"invalid admin id"
            })
        }   
        const updateadmin=await adminModel.findByIdAndUpdate(adminId,req.body,{new:true})
        if(!updateadmin){
            return res.status(404).json({
                message:"admin not found"
            })
        }
        res.status(200).json({
            message:"admin updated successfully",
            data:updateadmin
        })
    }   catch(err){
        console.log(err);   
        res.status(500).json({  
            message:"error",
            err:err.message
        })
    }   
}

const upadateLogo=async(req,res)=>{
    try{
          const admin = await adminModel.findById("68d142c531e21c97b30934e4");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    
    if(req.file){
        admin.logo=req.file.path
    }
    await admin.save()
    }catch(err){
           console.error(err);
    res.status(500).json({
        message: "Error updating logo",
        message: "logo updated successfully",
      error: err.message
    })
    }
}

module.exports={getAllAdmins,addAdmins,createAdmin,updateAdmin,upadateLogo}